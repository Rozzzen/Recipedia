import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {CodeInputModule} from "angular-code-input";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'recipedia-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    CommonModule
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message: string = '';
  operationSuccessful: boolean = false;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login'])
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login'
        this.operationSuccessful = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid'
        this.operationSuccessful = false;
      }
    })
    this.submitted = true;
  }
}
