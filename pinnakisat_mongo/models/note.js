////////////////////////////////////////////////////////////////////////////////////////
// This code connects to a MongoDB database using Mongoose, retrieves the MongoDB URI ///////////////
// from environment variables, and logs the connection attempt. It defines a schema for notes with //////////////
// content and importance fields, setting specific constraints on the content field. Additionally, it modifies //
// the behavior of JSON serialization to include an "id" field instead of "_id" and exclude "__v". Finally, it //
// exports a Mongoose model named 'Note' based on the defined schema. ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


const mongoose = require('mongoose'); // Importing mongoose library for MongoDB interaction

mongoose.set('strictQuery', false); // Setting mongoose option to allow flexible querying

const url = process.env.MONGODB_URI; // Retrieving MongoDB URI from environment variables

console.log('connecting to', url); // Logging message indicating connection attempt to MongoDB

// Connecting to MongoDB using the retrieved URI
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB'); // Logging message upon successful connection
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message); // Logging error message if connection fails
  });

// Defining schema for notes
const noteSchema = new mongoose.Schema({
  content: {
    type: String, // Type of content is string
    minlength: 5, // Minimum length of content is 5 characters
    required: true // Content is required
  },
  important: Boolean, // Importance flag of the note
});

// Modifying schema options for JSON output
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // Converting _id to string and assigning to id
    delete returnedObject._id; // Removing _id field from output
    delete returnedObject.__v; // Removing __v field from output
  }
});

// Exporting Note model based on the defined schema
module.exports = mongoose.model('Note', noteSchema);
