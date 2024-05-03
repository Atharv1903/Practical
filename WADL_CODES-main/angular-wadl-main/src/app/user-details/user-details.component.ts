// user-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve user details from localStorage
    const storedUserDetails = localStorage.getItem('user');

    // Parse the JSON string to get the user object
    this.user = storedUserDetails ? JSON.parse(storedUserDetails) : null;

    // Print user details to the console
    console.log('User Details:', this.user);
  }
}
