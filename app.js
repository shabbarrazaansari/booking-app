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

  // Display the saved data with a delete button
  displaySavedData(formData);
});

// Function to display saved data with delete button
function displaySavedData(formData) {
  // Create a new <div> element to display the data
  const dataDiv = document.createElement('div');

  // Create a <span> element to show the data
  const dataSpan = document.createElement('span');
  dataSpan.textContent = JSON.stringify(formData);

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';

  // Add event listener to the delete button
  deleteButton.addEventListener('click', function() {
    // Remove the saved data from local storage
    localStorage.removeItem('formData');

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
