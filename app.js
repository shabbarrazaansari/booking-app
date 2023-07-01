// app.js

// Retrieve the form element and the area to display saved data
const form = document.getElementById('myForm');
const savedDataDiv = document.getElementById('savedData');

// Add submit event listener to the form
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Retrieve the form inputs
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  // Get the values from the form inputs
  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  // Create an object with the form values
  const formData = {
    name: name,
    email: email,
    phone: phone
  };

  // Convert the object to a JSON string
  const jsonData = JSON.stringify(formData);

  // Save the JSON string in local storage
  localStorage.setItem('formData', jsonData);

  // Clear the form inputs
  nameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';

  // Display the saved data
  savedDataDiv.textContent = jsonData;
});
