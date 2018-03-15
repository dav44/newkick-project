import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  name: String;
  lastName: String;
  email: String;
  password: String; 

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onSignUpSubmit() {
    const user = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }
    
    if(!this.validateService.validateSignUp(user)) {
      console.log('please fill in all fields');
    }
    
    this.authService.signUpUser(user).subscribe(data => {
      if(data.success) {
        console.log('you are now registered and can login');
        this.router.navigate(['/login']);
      } else {
        console.log('sign up faild');
        this.router.navigate(['/signup']);
      }
    })
  }

}
