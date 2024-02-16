////////////////////////////////////////////////////////////////////////////////////
// This code connects to a MongoDB database using Mongoose, defines a schema for ////////////////////////
// notes, creates a new note instance, finds all notes in the database, and logs them to the console. //
// It expects a password as a command-line argument to connect to the MongoDB instance. ///////////////
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
// !! Remember to change the references ("Note") here if/when changed inside "index.js" !! //
/////////////////////////////////////////////////////////////////////////////////////////////


const mongoose = require('mongoose'); // Importing mongoose library for MongoDB interaction

// Checking if password is provided as command-line argument
if (process.argv.length < 3) {
  console.log('give password as argument'); // Logging message to provide password as argument
  process.exit(1); // Exiting process with code 1
}

const password = process.argv[2]; // Retrieving password from command-line arguments

const url =
  'mongodb+srv://pinnakisat:embdPwbqnBNkOGki@cluster0.3mlbjrx.mongodb.net/?retryWrites=true&w=majority'; // MongoDB connection URL

mongoose.set('strictQuery', false); // Setting mongoose option to allow flexible querying
mongoose.connect(url); // Connecting to MongoDB database using provided URL

// Defining schema for notes
const noteSchema = new mongoose.Schema({
  content: String, // Content of the note
  date: Date, // Date of the note
  important: Boolean, // Importance of the note
});

const Note = mongoose.model('Note', noteSchema); // Creating Note model based on schema

// Creating a new note instance
const note = new Note({
  content: 'Mongoose makes things easy', // Content of the note
  date: new Date(), // Current date
  important: true, // Marking note as important
});

// Finding all notes in the database
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note); // Logging each found note
  });
  mongoose.connection.close(); // Closing database connection
});
