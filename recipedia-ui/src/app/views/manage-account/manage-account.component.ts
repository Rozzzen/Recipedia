import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../services/services/user.service";
import {FileUploadService} from "../../services/file-upload/file-upload.service";

@Component({
  selector: 'recipedia-manage-account',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss'
})
export class ManageAccountComponent implements OnInit {

  accountForm: FormGroup;
  errorMsg: Array<string> = [];

  constructor(private userService: UserService,
              protected fileUploadService: FileUploadService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.accountForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
    this.userService.getAuthenticatedUser().subscribe({
      next: user => {
        this.accountForm = this.formBuilder.group({
          id: user.id,
          firstname: user.firstname as string,
          lastname: user.lastname as string,
          email: user.email as string,
        })
        if (user.profilePicture) {
          this.fileUploadService.selectedPictureFile = this.fileUploadService.base64ToFile(user.profilePicture.toString())
          this.fileUploadService.selectedPictureString = 'data:image/jpg;base64,' + user.profilePicture
        }
      }
    })
  }

  updateAccount() {
    this.userService.updateUser({
      body: this.accountForm.value
    }).subscribe({
      next: () => {
        if (this.fileUploadService.getSelectedPictureFile()) {
          this.userService.uploadProfilePicture({
            body: {
              file: this.fileUploadService.getSelectedPictureFile()
            }
          }).subscribe({
            next: () => {
              this.router.navigate(['recipes'])
            },
            error: err => {
              this.errorMsg.push(err.error.error)
              window.scroll(0, 0)
            }
          })
        } else this.router.navigate(['recipes/my-recipes'])
      },
      error: err => {
        console.log(err.errorMsg);
        this.errorMsg = err.error.validationErrors;
        window.scroll(0, 0)
      }
    })
  }
}
