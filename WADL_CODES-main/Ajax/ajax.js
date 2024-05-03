const form = document.getElementById('form');
const username = document.getElementById('username');
const fullname = document.getElementById('name');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const dob = document.getElementById('dob');
const state = document.getElementById('state');
const district = document.getElementById('districtSelect');
const pincode = document.getElementById('pincode');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    validate();
});

const validate = () => {
    const usernameVal = username.value.trim();
    const nameVal = fullname.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    const pincodeVal = pincode.value.trim();


    if (!usernameVal) {
        alert("Username can't be empty!")
        return false;
    }

    if (!nameVal) {
        alert("Full Name can't be empty!")
        return false;
    }
    const smallpasswordRegex = /[a-z]/
    const upperpasswordRegex = /[A-Z]/
    const digitpasswordRegex = /[0-9]/
    const specialpasswordRegex = /[!@#$%^&*;:'"<>,.?]/

    if (!passwordVal) {
        alert("Password can't be empty!")
        return false;
    }
    else if (!smallpasswordRegex.test(passwordVal)) {
        alert("Password must be combination of  SmallCase letters")
        return false;
    }
    else if (!upperpasswordRegex.test(passwordVal)) {
        alert("Passowrd must contain uppercase letters as well.")
        return false;
    }
    else if (!digitpasswordRegex.test(passwordVal)) {
        alert("Password must contain digits as well.")
        return false;
    }
    else if (!specialpasswordRegex.test(passwordVal)) {
        alert("Password must contain special characters.")
        return false;
    }
    else if (passwordVal.length < 6) {
        alert("Password must be of min. 6 characters!");
        return false;
    }

    if (!cpasswordVal) {
        alert("Confirm password can't be empty!")
        return false;
    }
    else if (passwordVal != cpasswordVal) {
        alert("Confirm password and password don't match!")
        return false;
    }

    if (!pincodeVal) {
        alert("Pincode can't be empty")
        return false;
    }
    else if (pincodeVal.length != 6) {
        alert("Pincode should be exact of 6 digits!")
        return false;
    }
    return true;
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault();

        if (validate()) {
            const username = document.getElementById('username').value;
            const fullname = document.getElementById('name').value;
            const password = document.getElementById('password').value;
            const dob = document.getElementById('dob').value;
            const state = document.getElementById('state').value;
            const district = document.getElementById('districtSelect').value;
            const pincode = document.getElementById('pincode').value;
            const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : "";
            const hobbies = {
                Dancing: document.getElementById('dancing').checked,
                Reading: document.getElementById('reading').checked,
                Singing: document.getElementById('singing').checked
            }

            // var user = [
            //     { username: username },
            //     { name: fullname },
            //     { password: password },
            //     { dob: dob },
            //     { state: state },
            //     { district: district },
            //     { pincode: pincode },
            //     { gender: gender }
            // ];
            var user = {
                name: fullname,
                username: username,
                password: password,
                dob: dob,
                gender: gender,
                district: district,
                pincode: pincode,
                state: state,
                gender: gender
            };




            // // Create a new XMLHttpRequest object
            // const xhr = new XMLHttpRequest();

            // // Define the API endpoint URL
            // const url = "https://jsonplaceholder.typicode.com/users";

            // // Open a POST request to the API endpoint
            // xhr.open("POST", url, true);

            // // Set the Content-Type header to specify that we are sending JSON data
            // xhr.setRequestHeader("Content-Type", "application/json");
            // xhr.onload = function () {
            //     if (xhr.status >= 200 && xhr.status < 300) {
            //         // Request was successful
            //         console.log("Data sent successfully:", xhr.responseText);
            //     } else {
            //         // There was an error
            //         console.error("Error:", xhr.status, xhr.statusText);
            //     }
            // };

            // var userJson = JSON.stringify(user);
            // xhr.send(userJson);

            var users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "login.html";

        }
    }
    )
}
);


