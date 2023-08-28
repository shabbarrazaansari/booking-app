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

      // Fetch and display updated data from the API
      fetchAndDisplayData();
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
});

// Function to fetch and display data from the API
function fetchAndDisplayData() {
  // Make a GET request to the API using Axios
  axios.get(`${apiUrl}/appontment`)
    .then(response => {
      const appointments = response.data; // Assuming the API returns an array of appointments

      // Clear the existing data from the screen
      savedDataDiv.innerHTML = '';

      // Display each appointment
      appointments.forEach(appointment => {
        displaySavedData(appointment);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to display saved data with delete and edit buttons
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
    // Delete the data from the API using Axios
    axios.delete(`${apiUrl}/appontment/${formData._id}`)
      .then(response => {
        console.log('Data deleted successfully:', response.data);
        // Remove the displayed data from the screen
        savedDataDiv.removeChild(dataDiv);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  });

  // Create an edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';

  // Add event listener to the edit button
  editButton.addEventListener('click', function() {
    // Enable editing of the email field
    const emailInput = document.getElementById('email');
    emailInput.disabled = false;
  });

  // Create a delete icon
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fas fa-trash-alt delete-icon';
  deleteIcon.addEventListener('click', function() {
    // Delete the data from the API using Axios
    axios.delete(`${apiUrl}/appontment/${formData._id}`)
      .then(response => {
        console.log('Data deleted successfully:', response.data);
        // Remove the displayed data from the screen
        savedDataDiv.removeChild(dataDiv);
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  });

  // Append the data, delete button, edit button, and delete icon to the new <div> element
  dataDiv.appendChild(dataSpan);
  dataDiv.appendChild(deleteButton);
  dataDiv.appendChild(editButton);
  dataDiv.appendChild(deleteIcon);

  // Append the new <div> element to the savedDataDiv
  savedDataDiv.appendChild(dataDiv);
}

// Load and display data on page load
window.addEventListener('load', function() {
  fetchAndDisplayData();
});
