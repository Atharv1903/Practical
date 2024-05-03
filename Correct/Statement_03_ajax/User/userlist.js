document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user list from local storage
    var userList = JSON.parse(localStorage.getItem("userList")) || [];
    
    // Reference to the table body
    var tableBody = document.getElementById("userList");
    
    // Iterate over each user and create table rows
    userList.forEach(function(user) {
      var row = document.createElement("tr");
      
      var usernameCell = document.createElement("td");
      usernameCell.textContent = user.username;
      
      var emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      
      row.appendChild(usernameCell);
      row.appendChild(emailCell);
      
      tableBody.appendChild(row);
    });
});
  