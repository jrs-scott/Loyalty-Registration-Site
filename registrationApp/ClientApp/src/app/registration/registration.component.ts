import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

// Form control instances for user registration. The fields are in a form group so the values are saved as an object
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false; // Value changed to true when the user tries to submit the registration form the first time.
                     // Validation errors don't appear until submitted = true

  // Inject the router, http request handler, and the form builder
  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Create the form using the required properties and add validation. All fields are required
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  get f() { return this.registrationForm.controls; } // Convenience getter for easy access to form fields. Used in the template

  // Method call for registration form submission. Validate the data, and post it to the controller to make the API call for account creation
  onSubmit() {
    this.submitted = true; // On form submit, Attempt to validate the input fields. Errors will display in the template accordingly

    // Don't make a post request with the data if it's not valid - break out of the onSubmit method
    if (this.registrationForm.invalid) {
      return;
    }

    // Required fields for the API request body
    const body = {
      "Username": this.registrationForm.value.username,
      "RegistrationChannel": "Technical challenge",
      "UserProfileProperties": [
        {
          "ProfilePropertyName": "Email",
          "Email": this.registrationForm.value.email
        }
      ]
    };

    // Post the registration form data to the REST API call
    this.http.post("api/user", body,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }
    ).subscribe((response) => {
      // The controller will send the user ID back if it successfully creates an account. Otherwise, an error occurred and the response/ID will be null
      // Better error handling is required
      if (response == null) {
        window.alert("Something went wrong. Please try again.");
      }
      // If an account is successfully created, an ID is returned. Pass the ID into the route and redirect the user to a welcome page
      else {
        this.router.navigate([`/dashboard/${response}`]);      
      }      
    });       
  }
}
