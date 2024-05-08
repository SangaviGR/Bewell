// Import necessary modules
const express = require('express');
const router = express.Router();
const path = require('path');

// Import the createPdf function from pdfUtils
const { createPdf } = require('../service/pdfUtils');

// Define a route to handle the POST request
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Get the data sent from the frontend
        const inputFilePath = 'patient-enrolment.pdf'
        const outputFilePath = 'output.pdf'

        // Call the createPdf function with the data
        await createPdf(inputFilePath, outputFilePath, data);

        // Send the output.pdf file as a response for download
        res.download(outputFilePath, 'output.pdf', (err) => {
            if (err) {
                console.error('Error downloading the PDF:', err);
                res.status(500).json({ message: 'Error downloading the PDF' });
            } else {
                console.log('PDF downloaded successfully.');
            }
        });
    } catch (error) {
        console.error('Failed to create PDF:', error);
        res.status(500).json({ message: 'Failed to create PDF' });
    }
});

// Export the router
module.exports = router;