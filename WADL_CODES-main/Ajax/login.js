document.addEventListener('DOMContentLoaded', function () {
    // Retrieve users data from localStorage
    var usersJson = localStorage.getItem('users');
    var users = JSON.parse(usersJson) || []; // If no users found, initialize as an empty array

    // Listen for form submit event
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Find user by username
        var user = users.find(function (u) {
            return u.username === username && u.password === password;
        });

        if (user) {
            alert('Login successful! Welcome, ' + user.username);
            // Redirect to dashboard or other page
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});
