import {Component} from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'recipedia-register',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  request: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''}
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.request
    }).subscribe({
      next: () =>
        this.router.navigate(['activate-account']),
      error: err => {
        new Response(err.error).json().then(result =>
          this.errorMsg = result.validationErrors
        );
      }
    })
  }

  login() {
    this.router.navigate(['login'])
  }
}
