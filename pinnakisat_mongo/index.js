/////////////////////////////////////////////////////////////////////////////////////////////////
// This code sets up an Express server that provides an API for managing notes (for example). //////////////////////
// It includes routes for fetching all notes, creating a new note, fetching a single note by ID, updating a note //
// by ID, and deleting a note by ID. It also includes middleware for logging requests, handling errors,   ////////
// serving static files, and handling unknown endpoints. The server listens on the port specified in the //
// environment variables. ////////////////////////////////////////////////////////////////////////////////
///////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// !! "Note" is a placeholder and can/will be changed to any type of name, for example "käyttäjä", "salasana", "kisat" etc.. !! //  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Import necessary modules
const express = require('express'); // Importing Express framework
const app = express(); // Initializing Express application
const cors = require('cors'); // Importing CORS for cross-origin requests
require('dotenv').config(); // Configuring environment variables

// Importing Note model
const Note = require('./models/note');

// Middleware for logging requests
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method); // Logging HTTP request method
  console.log('Path:  ', request.path); // Logging requested path
  console.log('Body:  ', request.body); // Logging request body
  console.log('---');
  next(); // Passing control to the next middleware
}

// Middleware for handling errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message); // Logging error message

  // Handling specific error type
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' }); // Sending a response with status 400 and error message
  }

  next(error); // Passing error to the next middleware
}

// Middleware for handling unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' }); // Sending a response with status 404 and error message
}

// Using middlewares
app.use(cors()); // Allowing CORS for all routes
app.use(express.json()); // Parsing JSON bodies of requests
app.use(requestLogger); // Logging incoming requests
app.use(express.static('build')); // Serving static files from 'build' directory

// Route for fetching all notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => { // Finding all notes in the database
    response.json(notes); // Sending JSON response with the found notes
  })
})

// Route for creating a new note
app.post('/api/notes', (request, response) => {
  const body = request.body; // Extracting request body

  // Validating request body
  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' }); // Sending a response with status 400 and error message if content is missing
  }

  // Creating a new Note instance
  const note = new Note({
    content: body.content, // Assigning content from request body
    important: body.important || false, // Assigning importance from request body, defaulting to false if not provided
  })

  // Saving the new note to the database
  note.save().then(savedNote => {
    response.json(savedNote); // Sending JSON response with the saved note
  })
})

// Route for fetching a single note by ID
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id) // Finding a note by its ID
    .then(note => {
      if (note) {
        response.json(note); // Sending JSON response with the found note if it exists
      } else {
        response.status(404).end(); // Sending 404 status if note is not found
      }
    })
    .catch(error => next(error)); // Passing error to the error handling middleware
})

// Route for deleting a note by ID
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id) // Finding and removing a note by its ID
    .then(result => {
      response.status(204).end(); // Sending 204 status (No Content) if deletion is successful
    })
    .catch(error => next(error)); // Passing error to the error handling middleware
})

// Route for updating a note by ID
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body; // Extracting request body

  // Creating an object with updated note data
  const note = {
    content: body.content,
    important: body.important,
  }

  // Finding and updating a note by its ID
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote); // Sending JSON response with the updated note
    })
    .catch(error => next(error)); // Passing error to the error handling middleware
})

// Using middleware for handling unknown endpoints
app.use(unknownEndpoint);

// Using middleware for handling errors
app.use(errorHandler);

// Defining port for the server to listen on
const PORT = process.env.PORT;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Logging server start message
})
