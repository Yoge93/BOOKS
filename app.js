document.addEventListener('DOMContentLoaded', () => {
  const ageGroupSelect = document.getElementById('ageGroup');
  const genreSelect = document.getElementById('genre');
  const emailInput = document.getElementById('email');
  const recommendationButton = document.getElementById('getRecommendationsButton');
  const recommendationsList = document.getElementById('recommendationsList');

  recommendationButton.addEventListener('click', () => {
    if (validateForm()) {
      handleRecommendation();
    }
  });

  // Form Validation
  function validateForm() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value) {
      alert('Email is required.');
      return false;
    }
    if (!emailRegex.test(emailInput.value)) {
      alert('Invalid email format.');
      return false;
    }
    return true;
  }

  // Function to fetch book recommendations from Google Books API
  async function handleRecommendation() {
    const ageGroup = ageGroupSelect.value;
    const genre = genreSelect.value;

    if (!ageGroup || !genre) {
      alert('Please select both age group and genre.');
      return;
    }

    try {
      // Construct the query string for Google Books API
      const query = `${genre} ${ageGroup}`;
      
      // Fetch book data from Google Books API
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      const data = await response.json();

      // Display the book recommendations
      displayRecommendations(data.items);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  }

  // Function to display book recommendations
  function displayRecommendations(books) {
    recommendationsList.innerHTML = ''; // Clear existing recommendations
    if (books && books.length > 0) {
      books.forEach((book) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.volumeInfo.title} by ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}`;
        recommendationsList.appendChild(listItem);
      });
    } else {
      recommendationsList.innerHTML = '<p>No recommendations found.</p>';
    }
  }
});
