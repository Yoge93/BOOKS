// Frontend Code (Vanilla JavaScript)

document.addEventListener("DOMContentLoaded", function () {
    const ageGroupSelect = document.getElementById('ageGroup');
    const genreSelect = document.getElementById('genre');
    const emailInput = document.getElementById('email');
    const recommendationsContainer = document.getElementById('recommendations');
    
    let ageGroup = '';
    let genre = '';
    
    // Event listeners for dropdown selections
    ageGroupSelect.addEventListener('change', (e) => {
      ageGroup = e.target.value;
    });
    
    genreSelect.addEventListener('change', (e) => {
      genre = e.target.value;
    });
  
    // Handle recommendation fetch
    async function handleRecommendation() {
      if (!ageGroup || !genre) {
        alert('Please select both age group and genre.');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ageGroup, genre }),
        });
  
        const recommendations = await response.json();
        displayRecommendations(recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    }
  
    // Validate email
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
  
    // Display recommendations
    function displayRecommendations(recommendations) {
      recommendationsContainer.innerHTML = ''; // Clear previous recommendations
      if (recommendations.length > 0) {
        recommendations.forEach(book => {
          const li = document.createElement('li');
          li.textContent = book.title;
          recommendationsContainer.appendChild(li);
        });
      } else {
        recommendationsContainer.textContent = 'No recommendations found.';
      }
    }
  
    // Button click event
    const recommendationButton = document.getElementById('recommendationButton');
    recommendationButton.addEventListener('click', function () {
      if (validateForm()) handleRecommendation();
    });
  });
  