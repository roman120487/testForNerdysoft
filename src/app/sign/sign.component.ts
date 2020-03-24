import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  login: string;
  userPass: string;

  email: string;
  password: string;
  confirm: string;

  users = {};
  localStor: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getLocalStorage();
    
    
  }

  getLocalStorage() {
      this.localStor = localStorage.getItem('users');
      this.users = JSON.parse(this.localStor);
      console.log(this.users);
      if(this.localStor == null){
        this.users = {};
      }
  }

  signIn() {
    for (let key in this.users) {
      if (this.login == key && this.userPass == this.users[key]) {
        localStorage.setItem('isLogined', JSON.stringify(true))
        localStorage.setItem('activeUser', this.login)
        // localStorage.setItem('activeUser', JSON.stringify(this.login))
        // this.authService.move = true;
      }
    }
  }

  signUp() {
    if(this.users == null){
      this.users = {};
    }
    let exist = false;
    for (let key in this.users) {
      if (this.email == key) {
       alert('a user with the same name already exists')
       exist = true;
      }
    } 


    if (this.password == this.confirm && exist == false) {
      this.users[`${this.email}`] = this.password;
      localStorage.setItem('users', JSON.stringify(this.users))
      console.log(this.users);
      alert('Are you registered')
      this.email = '';
      this.password = '';
      this.confirm = '';
    } else {
      if(exist == false){
        alert('entered passwords do not match, try it again')
      }  
    }

  }
}
