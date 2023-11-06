import { Component,OnInit, Inject  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit{
  editData:any;
  inputData:any;
  hide = true;
  userForm:FormGroup;
  constructor(private _fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _userService: UserService,
    private toastr:ToastrService,
    private router: Router,
    private ref:MatDialogRef<AddUserComponent>){
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
    this.inputData=this.data;
    if(this.inputData.id>0){
      this.setDialogData(this.inputData.id)
    }
  }

  setDialogData(id:any){
    this._userService.getUserID(id).subscribe(item=>{
      this.editData=item;
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

  onFormSubmit(){
    if(this.userForm.valid){
      if(this.data.id != 0){
        this._userService.update(this.data.id,this.userForm.value)
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
            this.ref.close()

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
