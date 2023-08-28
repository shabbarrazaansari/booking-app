// Retrieve the form element and the area to display saved data
const form = document.getElementById('myForm');
const savedDataDiv = document.getElementById('savedData');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// API Base URL
const apiUrl = 'https://crudcrud.com/api/c796ed88951241a7a35df0cd43920fc1';

// Keep track of the edited user's ID
let editedUserId = null;

// Add submit event listener to the form
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  // If we have an editedUserId, update the user detail
  if (editedUserId) {
    const editedData = {
      name: name,
      email: email,
      phone: phone
    };

    // Update the user detail using Axios
    axios.put(`${apiUrl}/appontment/${editedUserId}`, editedData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
        // Clear the editedUserId after successful update
        editedUserId = null;
        // Fetch and display updated data from the API
        fetchAndDisplayData();
        // Clear the form inputs
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  } else {
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
  }
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

// Function to display saved data with delete, edit buttons, and edit icon
function displaySavedData(formData) {
  const dataDiv = document.createElement('div');
  const dataSpan = document.createElement('span');
  dataSpan.textContent = `Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}`;
  
  // Create an edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
    // Populate the main form with user details for editing
    nameInput.value = formData.name;
    emailInput.value = formData.email;
    phoneInput.value = formData.phone;
    // Set the editedUserId for updating the correct user
    editedUserId = formData._id;
  });

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    // Delete the data from the API using Axios
    axios.delete(`${apiUrl}/appontment/${formData._id}`)
      .then(response => {
        console.log('Data deleted successfully:', response.data);
        // Fetch and display updated data from the API
        fetchAndDisplayData();
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  });

  // Create a delete icon
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fas fa-trash-alt delete-icon';
  deleteIcon.addEventListener('click', function() {
    // Delete the data from the API using Axios
    axios.delete(`${apiUrl}/appontment/${formData._id}`)
      .then(response => {
        console.log('Data deleted successfully:', response.data);
        // Fetch and display updated data from the API
        fetchAndDisplayData();
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  });

  // Append the data, edit button, delete button, and delete icon to the new <div> element
  dataDiv.appendChild(dataSpan);
  dataDiv.appendChild(editButton);
  dataDiv.appendChild(deleteButton);
  dataDiv.appendChild(deleteIcon);

  // Append the new <div> element to the savedDataDiv
  savedDataDiv.appendChild(dataDiv);
}

// Load and display data on page load
window.addEventListener('load', function() {
  fetchAndDisplayData();
});
