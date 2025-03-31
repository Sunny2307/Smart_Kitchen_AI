const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Placeholder for your AI model function (adjust path as needed)
const detectVegetables = async (imagePath) => {
  try {
    // Replace this with your actual AI model logic
    // For example, if using a Python model, you might use child_process to run a script
    // or if it's a JS-based model (e.g., TensorFlow.js), call it directly
    console.log(`Processing image at: ${imagePath}`);
    // Dummy result for now
    return ['tomato', 'carrot'];
  } catch (error) {
    throw new Error(`AI model error: ${error.message}`);
  }
};

// Controller function to handle image upload and vegetable detection
const detectVegetablesFromImage = async (req, res) => {
  try {
    // Step 1: Validate the uploaded file
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded. Please upload an image file.' });
    }

    const imagePath = req.file.path; // Local path where multer saved the file

    // Step 2: Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imagePath, {
      folder: 'vegetable-detection', // Organize images in a Cloudinary folder
      resource_type: 'image',
      use_filename: true, // Optional: Keep the original filename
      unique_filename: false // Optional: Avoid adding random characters to the filename
    });

    // Get the secure URL of the uploaded image
    const imageUrl = uploadResult.secure_url;
    console.log(`Image uploaded to Cloudinary at: ${imageUrl}`);

    // Step 3: Prepare the image for the AI model
    let detectionResult;
    if (true) { // Replace with a condition if your model can directly use a URL
      // If your AI model needs a local file path, download the image from Cloudinary
      const downloadedImagePath = path.join(uploadsDir, `temp-${Date.now()}.jpg`);
      const fetch = (await import('node-fetch')).default; // Dynamic import for node-fetch
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to download image from Cloudinary');
      }
      const buffer = await response.buffer();
      fs.writeFileSync(downloadedImagePath, buffer);

      // Step 4: Pass the local image path to your AI model
      detectionResult = await detectVegetables(downloadedImagePath);

      // Step 5: Clean up the downloaded file
      fs.unlinkSync(downloadedImagePath);
    } else {
      // If your AI model can directly use a URL, pass imageUrl to the model
      // detectionResult = await detectVegetables(imageUrl);
    }

    // Step 6: Clean up the original multer file
    fs.unlinkSync(imagePath);

    // Step 7: Send the detection result and Cloudinary URL back to the frontend
    res.status(200).json({
      success: true,
      vegetables: detectionResult,
      imageUrl: imageUrl
    });
  } catch (error) {
    // Step 8: Handle errors and clean up if necessary
    console.error('Error in detectVegetablesFromImage:', error.message);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Clean up multer file on error
    }
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process image. Please try again.'
    });
  }
};

module.exports = { detectVegetablesFromImage };