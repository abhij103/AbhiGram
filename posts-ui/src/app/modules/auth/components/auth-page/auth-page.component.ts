import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  login = true;
  authForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private as: AuthService, private _snackBar: MatSnackBar
              ,private router:Router) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/)]]
    });
    //CC The above pattern is for password matching.
  }
  toggle(): void {
    this.login = !this.login;
    if (!this.login) {
      this.authForm.controls['name'].setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      this.authForm.controls['name'].removeValidators([Validators.required, Validators.minLength(3)]);
    }
  }
  submit(): void {
    if (this.authForm.valid) {
      if (!this.login) { // Signup call
        this.as.signup(this.authForm.value).subscribe({
          next: res => {
            if (res.message === 'User created!') {
              this._snackBar.open('Registered Succesfully!Login Now', 'Close',
                { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
                this.toggle();
            }
          }, error: res => {
            if (res.error.message === 'E-Mail address already exists!') {
              this.authForm.controls['email'].setErrors({duplicate:true});//CC Custom Async Error
            }else{
              this._snackBar.open('Some error occured at server,try again', 'Close',
                { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
            }
          }
        })
      }else{ //LOGIN
           this.as.loginToServer(this.authForm.value.email,this.authForm.value.password).subscribe({
            next: res => {
              this.router.navigate(['/home/posts/1']);
            }, error: res => {
              if (res.error.message === 'A user with this email could not be found.') {
                this._snackBar.open('A user with this email could not be found.', 'Close',
                  { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
              }else{
                this._snackBar.open('Wrong Password', 'Close',
                  { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' });
              }
            }
          })
      }
    }
  }
}
