const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json());  // To parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection (replace with your connection string)
const MONGODB_URI = 'mongodb://localhost:27017/auctiondb';
const JWT_SECRET = 'your_jwt_secret_key';  // Set your secret key here

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true } // auctioneer or bidder
});
const User = mongoose.model('User', userSchema);

// Auction Schema and Model
const auctionSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    itemStartingBid: { type: Number, required: true },
    itemImage: { type: String },
});
const Auction = mongoose.model('Auction', auctionSchema);

// Bid Schema and Model
const bidSchema = new mongoose.Schema({
    auctionItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true },
    bidAmount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bidDate: { type: Date, default: Date.now },
});
const Bid = mongoose.model('Bid', bidSchema);

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save images to 'uploads' folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // File naming convention
    }
});
const upload = multer({ storage: storage });

// Middleware to protect routes requiring authentication
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract JWT from authorization header

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);  // Verify JWT
        req.user = decoded;  // Store decoded user info for use in next routes
        next();  // Proceed to next middleware or route
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// User Registration Route
app.post('/register', async (req, res) => {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, userType });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

// User Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, userType: user.userType }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, userType: user.userType });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Add Auction Item Route (Auctioneer only)
app.post('/add-auction', authenticate, upload.single('itemImage'), async (req, res) => {
    if (req.user.userType !== 'auctioneer') {
        return res.status(403).json({ message: 'Only auctioneers can add auction items' });
    }

    const { itemName, itemDescription, startDate, endDate, itemStartingBid } = req.body;
    const itemImage = req.file ? req.file.path : null;

    if (!itemName || !itemDescription || !startDate || !endDate || !itemStartingBid) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newAuction = new Auction({
            itemName,
            itemDescription,
            startDate,
            endDate,
            itemStartingBid,
            itemImage,
        });

        await newAuction.save();
        res.status(201).json({ message: 'Auction item added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding auction item', error: error.message });
    }
});

// Get All Auctions Route
app.get('/auctions', async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.status(200).json(auctions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching auctions', error: err.message });
    }
});

// Place a Bid Route
app.post('/place-bid', authenticate, async (req, res) => {
    const { auctionItem, bidAmount } = req.body;

    if (!auctionItem || !bidAmount) {
        return res.status(400).json({ message: 'Invalid bid data' });
    }

    try {
        const auction = await Auction.findById(auctionItem);
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }

        const minimumBidAmount = auction.itemStartingBid + 5;  // Adjust according to your rules (5 or 10)
        if (bidAmount < minimumBidAmount) {
            return res.status(400).json({ message: `Bid must be at least $${minimumBidAmount}` });
        }

        const newBid = new Bid({
            auctionItem: auctionItem,
            bidAmount,
            user: req.user.userId,
        });

        await newBid.save();
        res.status(201).json({ message: 'Bid placed successfully', bid: newBid });
    } catch (err) {
        res.status(500).json({ message: 'Error placing bid', error: err.message });
    }
});

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
