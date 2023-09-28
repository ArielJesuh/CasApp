import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  nombre_usuario:string='';
  contrasenia:string='';
  correo:string='';

  constructor(private toastr:ToastrService,
    private _userService : UserService
    ,private router: Router){
    
  }

  ngOnInit(): void {
  }

  addUser(){
    //Validacion nulos
    if(this.nombre_usuario == '' || this.contrasenia=='' || this.correo==''){
      console.log(this.nombre_usuario)
      this.toastr.error('Todos los campos deben estar completos.','Error')
      
    } else{
      //Creamos body para api
      const usuario:Usuario={
        contrasena:this.contrasenia,
        nombre_usuario:this.nombre_usuario,
        email:this.correo,
        telefono:1,
        tipo:1,
        run:"1"
      }

      
      this._userService.register(usuario).subscribe(data => {
        this.toastr.success('Usuario registrado exitosamente','Registrado')
        this.router.navigate(['/login'])
      },error =>{
        this.toastr.error('El usuario ya existe.','Error')

      })
    }
  }
}
