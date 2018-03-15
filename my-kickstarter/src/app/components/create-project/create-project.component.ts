import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  title: String;
  subtitle: String;
  createdBy: String;
  category: String;
  image: String;
  about: String;
  foundingGoal: Number;
  backers: Number;
  foundingDuration: Number;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onProjectCreatedSubmit() {
    const project = {
      title: this.title,
      subtitle: this.subtitle,
      createdBy: this.createdBy,
      category: this.category,
      image: this.image,
      about: this.about,
      foundingGoal: this.foundingGoal,
      backers: this.backers,
      foundingDuration: this.foundingDuration
    }
    if(!this.validateService.validateCreateProject(project)) {
      console.log('please fill in all fields');
    }
    this.authService.createProject(project).subscribe(data => {
      if(data.success) {
        console.log('your project has created');
        this.router.navigate(['/projectpage/:id']);
      } else {
        console.log('project creation faild');
        this.router.navigate(['/createproject']);
      }
    });
  }

}
