const express = require('express');
const router = express.Router();
const multer = require('multer');
const { detectVegetablesFromImage } = require('../controllers/wasteController');

// Configure multer for temporary local storage
const upload = multer({ dest: 'uploads/' });

// Route to handle vegetable detection
router.post('/detect-vegetables', upload.single('image'), detectVegetablesFromImage);

module.exports = router;