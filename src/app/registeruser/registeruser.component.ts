import { Component, OnInit } from '@angular/core';
import { User } from '../entity/User';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent  implements OnInit {

  user : User = {id: 1, username: "user", password: "pass"}

  constructor() { }

  ngOnInit(): void {

  }

}
