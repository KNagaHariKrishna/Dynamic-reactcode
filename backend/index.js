// Import the necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Import body-parser middleware
const cors=require("cors")

// Create a Mongoose schema
const DataSchema = new mongoose.Schema({
  data: [{ value: String }],
});

// Create a Mongoose model based on the schema
const DataModel = mongoose.model('Data', DataSchema);

// Create an Express app
const app = express();
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use body-parser middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Define an API endpoint for storing data
app.post('/api/data', async (req, res) => {
  try {
    // Extract the data from the request body
    const data = req.body.data;

    // Create a new instance of the DataModel
    const newData = new DataModel({ data });

    // Save the data to MongoDB
    await newData.save();

    // Send a response
    res.status(200).json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save data.' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});

