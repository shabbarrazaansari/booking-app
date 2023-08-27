// Retrieve the form element and the area to display saved data
const form = document.getElementById('myForm');
const savedDataDiv = document.getElementById('savedData');

// API Base URL
const apiUrl = 'https://crudcrud.com/api/c796ed88951241a7a35df0cd43920fc1';

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

  // Save the data to the API using Axios
  axios.post(`${apiUrl}/appontment`, formData)
    .then(response => {
      console.log('Data sent successfully:', response.data);

      // Clear the form inputs
      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';

      // Display the saved data with delete button
      displaySavedData(formData);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
});

// Function to display saved data with delete button
function displaySavedData(formData) {
  // Create a new <div> element to display the data
  const dataDiv = document.createElement('div');

  // Create a <span> element to show the data
  const dataSpan = document.createElement('span');
  dataSpan.textContent = `Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}`;

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  // Add event listener to the delete button
  deleteButton.addEventListener('click', function() {
    // Remove the displayed data from the screen
    savedDataDiv.removeChild(dataDiv);
  });

  // Append the data and delete button to the new <div> element
  dataDiv.appendChild(dataSpan);
  dataDiv.appendChild(deleteButton);

  // Append the new <div> element to the savedDataDiv
  savedDataDiv.appendChild(dataDiv);
}

// Check if there is any saved data on page load
window.addEventListener('load', function() {
  const storedData = localStorage.getItem('formData');
  if (storedData) {
    const formData = JSON.parse(storedData);
    displaySavedData(formData);
  }
});
