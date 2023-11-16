import { Component,OnInit, Inject  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editData:any;
  inputData:any;
  hide = true;
  userForm:FormGroup;
  usuario!:Usuario
  constructor(private _fb:FormBuilder,
    private _userService: UserService,
    private toastr:ToastrService){
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
      const id = Number(sessionStorage.getItem('id'));
      this._userService.getUserID(id).subscribe(item=>{
        this.editData = item;
        this.userForm.setValue({
          nombre_usuario:this.editData.nombre_usuario,
          contrasena:this.editData.contrasena,
          email:this.editData.email,
          run:this.editData.run,
          telefono:this.editData.telefono,
          tipo:this.editData.tipo
        })
      })
    }

    saveProfile():void{
      const id = Number(sessionStorage.getItem('id'));
      if(this.userForm.valid){
        if(id != 0){
          this._userService.update(id,this.userForm.value)
          .subscribe({
            next:(val:any) => {
              this.toastr.success('Usuario Actualizado exitosamente','Actualizado')
              this.ngOnInit();
            }
          })
        }else{
  
          //Validacion nulos
          if(this.userForm.value.nombre_usuario == '' || this.userForm.value.password=='' || this.userForm.value.email==''){
            this.toastr.error('Todos los campos deben estar completos.','Error')
            
          } else{
            this._userService.register(this.userForm.value).subscribe(data => {
              this.toastr.success('Usuario registrado exitosamente','Registrado')
  
            },error =>{
              this.toastr.error('El usuario ya existe.','Error')
            })
          }
        }
     } else{
      this.toastr.error('El formulario debe rellenarse con datos validos.','Error')
     }
    }
}

