import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    phone: '',
    city: '',
    state: '',
    pincode: ''
  };

  register() {
    // Validate inputs
    const hasLetter = /[a-zA-Z]/.test(this.user.username);
    const hasDigit = /[0-9]/.test(this.user.username);
    if (!hasLetter && !hasDigit) {
      alert('Username must contain alphabets as well as numeric values.')
      return;
    }
    if (this.user.password !== this.user.confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }

    // Check phone number
    const phoneNumber = this.user.phone.trim();
    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      alert('Phone number must have 10 digits.');
      return;
    }

    // // Check pincode
    const pincode = this.user.pincode.trim();
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      alert('Pincode must have 6 digits.');
      return;
    }

    const hasAtSymbol = this.user.email.includes('@');
    const hasDot = this.user.email.includes('.');

    if (!hasAtSymbol || !hasDot) {
      alert('Invalid email format.');
      return;
    }

    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(this.user));
    alert('Registration successful!');
  }
}
