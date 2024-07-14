import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../../services/services/user.service";
import {NgOptimizedImage} from "@angular/common";
import {UserResponse} from "../../../../services/models/user-response";
import {SearchBarService} from "../../../../services/search-bar/search-bar.service";

@Component({
  selector: 'recipedia-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  currentUser: UserResponse = {firstname: ''};
  profilePicture: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private searchBarService: SearchBarService
  ) {
  }

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
    this.userService.getAuthenticatedUser().subscribe({
      next: value => {
        this.currentUser = value;
        this.profilePicture = 'data:image/jpg;base64,' + this.currentUser.profilePicture?.toString();
      }
    })
  }

  onSearch($event: any) {
    this.searchBarService.updateSearchQuery($event);
  }

  manageAccount() {
    this.router.navigate(['manage-account'])
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
