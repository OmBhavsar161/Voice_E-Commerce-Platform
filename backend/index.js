require("dotenv").config();
const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_BACKEND_KEY); // Fixed typo

const INR_TO_USD_CONVERSION_RATE = 83.91;

const convertINRToUSD = (amountInINR) => {
  return Math.round((amountInINR / INR_TO_USD_CONVERSION_RATE) * 100); // Convert to cents
};

app.use(express.json());
app.use(
  cors({
    origin: "https://ecom-vercel-frontend.vercel.app", // Update this with your frontend URL
  })
);

// Serve static files from 'public' directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Connect to MongoDB without deprecated options
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// API Root Endpoint
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// -----------------------------------------------------------------------------------------------------
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configure Cloudinary with the URL
cloudinary.config({
  url: process.env.CLOUDINARY_URL,
});

// Use multer to handle file uploads as streams
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Image upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Convert buffer to stream
  const stream = streamifier.createReadStream(req.file.buffer);

  // Upload file to Cloudinary
  cloudinary.uploader
    .upload_stream({ resource_type: "auto" }, (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Error uploading file" });
      }
      res.json({
        success: 1,
        image_url: result.secure_url, // Cloudinary URL
      });
    })
    .end(req.file.buffer);
});

// -----------------------------------------------------------------------------------------------------

// Product Schema
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  off_percentage: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  popular: { type: Boolean, default: false }, // New field added
});

// Add Product Endpoint
app.post("/addproduct", async (req, res) => {
  try {
    // Find the highest current product ID
    let highestProduct = await Product.findOne({}, "id")
      .sort({ id: -1 })
      .limit(1);

    // Calculate the next ID, starting from 40
    let nextId = highestProduct ? highestProduct.id + 1 : 40;

    const product = new Product({
      id: nextId,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      off_percentage: req.body.off_percentage,
    });

    await product.save();
    console.log("Product saved successfully");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// Remove Product Endpoint
app.post("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove product" });
  }
});

// Define the SupportPage schema
const supportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  issueDescription: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create a Support model from the schema
const Support = mongoose.model("support_form_data", supportSchema);

app.post("/support", async (req, res) => {
  try {
    const { name, email, phoneNumber, productId, issueDescription } = req.body;

    const supportRequest = new Support({
      name,
      email,
      phoneNumber,
      productId,
      issueDescription,
    });

    await supportRequest.save();

    res.json({
      success: true,
      message:
        "Your response has been recorded. Our team will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Error saving support request:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit support request." });
  }
});

// Route to fetch all support requests
app.get("/supportdatafetch", async (req, res) => {
  try {
    const supportRequests = await Support.find();
    res.json({
      success: true,
      data: supportRequests,
    });
  } catch (error) {
    console.error("Error fetching support requests:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch support requests." });
  }
});

// Route to delete a support request
app.post("/removesupport", async (req, res) => {
  try {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid ID format." });
    }

    const result = await Support.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Support request not found." });
    }

    res.json({
      success: true,
      message: "Support request removed successfully.",
    });
  } catch (error) {
    console.error("Error removing support request:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to remove support request." });
  }
});

// Stripe Payment Endpoint
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: convertINRToUSD(item.price),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "https://localhost:5173/success", // Update with the correct URL
      cancel_url: "https://localhost:5173/cancel", // Update with the correct URL
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get All Products Endpoint
app.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Get Single Product by ID Endpoint
app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id, 10) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
});

// New collection Endpoint
app.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ date: -1 }).limit(8);
    console.log("New Collections Fetched");
    res.json(products);
  } catch (error) {
    console.error("Error fetching new collections:", error);
    res.status(500).json({ message: "Failed to fetch new collections" });
  }
});

// Endpoint to fetch popular Products
app.get("/popular-products", async (req, res) => {
  try {
    const popularProducts = await Product.find({ popular: true });
    res.json(popularProducts);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching popular products" });
  }
});

app.post("/togglePopular", async (req, res) => {
  const { id, isPopular } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { id: id },
      { $set: { popular: isPopular } },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send("Error updating product status");
  }
});

app.post("/updateproduct", async (req, res) => {
  const { id, name, old_price, new_price, category, off_percentage } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id },
      {
        name,
        old_price,
        new_price,
        category,
        off_percentage,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product details" });
  }
});

// Start Server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});
