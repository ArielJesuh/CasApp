import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  nombre_usuario: string =''
  contrasenia: string = ''

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router:Router){}

  ngOnInit(): void {
    
  }

  login(){
    //Validar nulos
    if(this.nombre_usuario == '' || this.contrasenia=='' ){
      console.log(this.nombre_usuario)
      this.toastr.error('Todos los campos deben estar completos.','Error')
      return;
    } 
  //body usuario
    const usuario:Usuario = {
      contrasena:this.contrasenia,
      nombre_usuario:this.nombre_usuario,
      email:"",
      telefono:1,
      tipo:1,
      run:"1"
    }
    this._userService.login(usuario).subscribe({
      next:(token) =>
      {
        this.router.navigate(['/'])
        localStorage.setItem('token', token)
      }
    })
  }
}
