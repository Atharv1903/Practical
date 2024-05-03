document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    var userData = {
      username: username,
      email: email,
      password: password
    };
    
    // Push data to an array in local storage
    var userList = JSON.parse(localStorage.getItem("userList")) || [];
    userList.push(userData);
    localStorage.setItem("userList", JSON.stringify(userList));
    
    // Redirect to a new page to display the data list
    window.location.href = "userlist.html";
  });
  