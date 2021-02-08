import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    //  this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error);
    });
    console.log('registered');
    this.toastr.success('Registration successful');
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');

  }

}
