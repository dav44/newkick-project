import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';



@Component({
  selector: 'app-categorie-page',
  templateUrl: './categorie-page.component.html',
  styleUrls: ['./categorie-page.component.css']
})
export class CategoriePageComponent implements OnInit {
  projects:Object [];
  
  
  
  constructor(private authService:AuthService) { }

  getAllprojects() {
    this.authService.getProjects().subscribe(data => {
      this.projects = data.projects.slice(0,3);    
      //console.log(this.projects)
    
  });
 
  }
   
 
  ngOnInit() {
    
    this.getAllprojects();

    
  };

}
