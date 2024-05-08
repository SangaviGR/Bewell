const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { createPdf } = require('./service/pdfUtils'); // Import the createPdf function
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });
const router = require("./routes");
const docRoutes = require("./routes/doctorRoute");
const submitRoutes = require("./routes/submit-data");

// DB connection
connectDB();

// middleware
app.use(express.json()); //takes the req and sets it into the body
app.use(cors());
app.use(router);

// routes

app.use("/api/doctor", docRoutes);
app.use("/api/submit-data", submitRoutes);

// error handle
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening to Port ${port} in ${process.env.NODE_ENV}`);
});

// Call the createPdf function
// createPdf('patient-enrolment.pdf', 'output.pdf');
