import { Component,OnInit,ViewChild } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  MatDialog } from '@angular/material/dialog';
import { DialogRecoverPassComponent } from '../dialog-recover-pass/dialog-recover-pass.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.component.html',
  styleUrls: ['./recuperar-pass.component.css']
})
export class RecuperarPassComponent implements OnInit {
  @ViewChild(AddUserComponent) addUser!:AddUserComponent;
  nombre_usuario: string =''
  run: string = ''
  userForm:FormGroup;
  editData:any;


  constructor(private toastr:ToastrService,
    private _userService: UserService,
    private _fb:FormBuilder,    
    private _dialog:MatDialog){
      this.userForm = this._fb.group({
        nombre_usuario: new FormControl(''),
        contrasena:new FormControl(''),
        email:new FormControl(''),
        run:new FormControl(''),
        telefono:new FormControl(''),
        tipo:new FormControl('')
      })

  }

  ngOnInit(): void {
    
  }

recuperar(){
  if(this.nombre_usuario == '' || this.run=='' ){
    this.toastr.error('Todos los campos deben estar completos.','Error')
    return;
  } 
  const body ={nombre_usuario : this.nombre_usuario,
              run:this.run}
      
  this._userService.getUserRecover(this.nombre_usuario,this.run).subscribe(data =>{
    this.toastr.success('Datos Correctos','Exito')
    this.editData = data;
    this._dialog.open(DialogRecoverPassComponent,{
      data: this.editData
    });    
  }, (error: HttpErrorResponse) => {
    this.toastr.error('Datos Invalidos.','Error')
  } 
  );
}


}
