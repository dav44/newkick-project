import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user:Object;
  
  
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getUserPage().subscribe(userPage => {
      this.user = userPage.user;
      
    },
     err => {
       console.log(err);
       return false;

    });
    


  }

}
