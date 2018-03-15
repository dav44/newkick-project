import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
    project = {
    title: String,
    subtitle: String,
    createdBy: String,
    category: String,
    image: String,
    about: String,
    foundingGoal: Number,
    backers: Number,
    foundingDuration: Number
  }
  currentUrl;
  

  constructor(private authService:AuthService, private router:Router, private activatedRoute:ActivatedRoute) {
     
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getOneProject(this.currentUrl.id).subscribe(data => {
      this.project = data.project;
    });
  }

  }

