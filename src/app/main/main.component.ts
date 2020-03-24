import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  users = {};
  localStor: string;
  toogle: boolean;
  id: string;
  idEdit: string;
  idShare: string;

  share: boolean;
  emailCoAuthor: string;

  task: string;
  taskList = [];
  index: number;

  userActive: string;
  // userCoauthor: string;
  constructor() { }

  ngOnInit() {
    this.getLocalStorage();
    this.generateId();
  }

  generateId(){
    this.id = `f${(~~(Math.random()*1e8)).toString(16)}`;
  }

  deleteTask(id){
    this.taskList.forEach((elem, index)=>{
      if(elem.id == id){
        this.taskList.splice(index,1)
      }
    })
    
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
    this.getLocalStorage();
  }


  editTask(task,id){
    this.task = task;
    this.idEdit = id;
    this.toogle = !this.toogle;
  }

  saveTask(){
    this.taskList.forEach((elem, index)=>{
      if(elem.id == this.idEdit){
        this.taskList[index].task = this.task;
      }
    })
   this.task = '';
   localStorage.setItem('taskList', JSON.stringify(this.taskList));
    this.toogle = !this.toogle;
  }

  shareTask(id){
    this.share = !this.share;
    this.idShare = id;
  }

  addCoAuthorTask(){
    this.taskList.forEach((elem, index)=>{
      if(elem.id == this.idShare){
        this.taskList[index].coAuthor = `${this.emailCoAuthor}`;
      }
    })

    localStorage.setItem('taskList', JSON.stringify(this.taskList));
    this.emailCoAuthor = '';
    this.share = !this.share;
    this.getLocalStorage();
    console.log(this.taskList);
    
  }


  addTask(){
    this.generateId();
    let author = localStorage.getItem('activeUser');
    if(this.taskList == null){
      this.taskList = [];
    }
    this.taskList.push({'id': this.id, 'author': `${author}`, 'task': `${this.task}`});
    this.task = '';
    localStorage.setItem('taskList', JSON.stringify(this.taskList));
    this.getLocalStorage();
  }

  logOut() {
    localStorage.removeItem('isLogined');
    localStorage.removeItem('activeUser');
  }


  getLocalStorage() {
    this.localStor = localStorage.getItem('users');
    this.users = JSON.parse(this.localStor);
    this.taskList = JSON.parse(localStorage.getItem('taskList'));
    this.userActive = localStorage.getItem('activeUser');
    if (this.localStor == null) {
      this.users = {};
    }
  }
}
