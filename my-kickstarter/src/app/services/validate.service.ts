import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateSignUp(user) {
    if(user.name === undefined || user.lastname === undefined || user.email === undefined || user.password === undefined) {
      return false;
    } else {
      return true;
    }
    
  }
  
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateCreateProject(project) {
    if(project.title === undefined || project.subtitle === undefined || project.createdBy === undefined || project.category === undefined || project.about === undefined || project.foundingGoal === undefined || project.foundingDuration === undefined) {
      return false;
    } else {
      return true;
    }
    
  }
  }




