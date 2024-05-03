// Retrieve user data from localStorage
var usersJson = localStorage.getItem('users');

// Parse JSON string into an array
var users = JSON.parse(usersJson);

// Reference to the table body
var tableBody = document.getElementById('userTableBody');

// Generate HTML markup for each user
users.forEach(function (user) {
    var row = document.createElement('tr');
    var idCell = document.createElement('td');
    var nameCell = document.createElement('td');
    var dob = document.createElement("td");

    idCell.textContent = user.username;
    nameCell.textContent = user.name;
    dob.textContent = user.dob;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(dob);
    tableBody.appendChild(row);
});
