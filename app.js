window.onload = function() {
  const ageGroupSelect = document.getElementById('ageGroup');
  const genreSelect = document.getElementById('genre');
  const emailInput = document.getElementById('email');
  const recommendationButton = document.getElementById('getRecommendationsButton');
  const recommendationsList = document.getElementById('recommendationsList');

  // Check if all elements are successfully selected
  if (!ageGroupSelect || !genreSelect || !emailInput || !recommendationButton || !recommendationsList) {
    console.error('One or more elements are missing in the DOM.');
    return;
  }

  recommendationButton.addEventListener('click', () => {
    if (validateForm()) {
      handleRecommendation();
    }
  });

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

  async function handleRecommendation() {
    const ageGroup = ageGroupSelect.value;
    const genre = genreSelect.value;

    if (!ageGroup || !genre) {
      alert('Please select both age group and genre.');
      return;
    }

    try {
      const response = await fetch('https://books-production-377c.up.railway.app/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ageGroup, genre }),
      });
      const recommendations = await response.json();
      displayRecommendations(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  }

  function displayRecommendations(recommendations) {
    recommendationsList.innerHTML = ''; // Clear existing recommendations
    if (recommendations.length > 0) {
      recommendations.forEach((book) => {
        const listItem = document.createElement('li');
        listItem.textContent = book.title;
        recommendationsList.appendChild(listItem);
      });
    } else {
      recommendationsList.innerHTML = '<p>No recommendations found.</p>';
    }
  }
};
