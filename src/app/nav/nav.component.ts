import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  loggedIn: boolean;
  //currentUser$: Observable<User>;

  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    //this.currentUser$ = this.authService.currentUser$;
    //this.getCurrentUser();
  }

  login() {
    this.authService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
      console.log('Logged in successfully', response);
      this.toastr.success('Login successful');
      //this.loggedIn = true;
    }, error => {
      console.log(error);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.toastr.info('Logout successful');
    //this.loggedIn = false;
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe(user => {
      this.loggedIn = !!user; //turns user into boolean
    }, error => {
      console.log(error);
    });
  }

}
