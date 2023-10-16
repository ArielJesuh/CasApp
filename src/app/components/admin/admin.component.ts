import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listUsuarios: Usuario[] = []


  constructor(private _userService: UserService){}

  ngOnInit(): void {
    this.getListUsuarios()
  }

  getListUsuarios(){
    this._userService.getListUsuarios().subscribe((data: Usuario[]) => {
      this.listUsuarios = data;
    }
  )}
}
