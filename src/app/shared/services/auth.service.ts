import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // move: boolean;
  constructor() { }

  checkLogined() {
    let status = localStorage.getItem('isLogined')
    if (status) {
      return true
    }
    else{
      alert('Login or password si wrong')
    }

  }

}
