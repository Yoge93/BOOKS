const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
// Middleware
app.use(bodyParser.json());
app.use(cors());
// Mock database
let books = [
  { id: 1, title: 'To Kill a Mockingbird', genre: 'Fiction', ageGroup: 'Adult' },
  { id: 2, title: 'Harry Potter', genre: 'Fantasy', ageGroup: 'Teen' },
  { id: 3, title: 'Charlotte\'s Web', genre: 'Children', ageGroup: 'Child' },
];
// API Endpoints
// Get book recommendations based on age group and genre
app.post('/recommendations', (req, res) => {
  const { ageGroup, genre } = req.body;
  if (!ageGroup || !genre) {
    return res.status(400).json({ message: 'Age group and genre are required.' });
  }
  const recommendations = books.filter(
    (book) => book.ageGroup === ageGroup && book.genre === genre
  );
  res.json(recommendations);
});
// Add a new book (for administrative use)
app.post('/add-book', (req, res) => {
  const { title, genre, ageGroup } = req.body;
  if (!title || !genre || !ageGroup) {
    return res.status(400).json({ message: 'All fields are mandatory.' });
  }
  const newBook = { id: books.length + 1, title, genre, ageGroup };
  books.push(newBook);
  res.json({ message: 'Book added successfully!', book: newBook });
});
app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});