import { Component, OnInit, Inject } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ViviendaService } from 'src/app/services/vivienda.service';
import {  ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-vivienda',
  templateUrl: './add-vivienda.component.html',
  styleUrls: ['./add-vivienda.component.css']
})
export class AddViviendaComponent implements OnInit{
  editData:any;
  inputData:any;
  hide=true;
  viviendaForm:FormGroup;
  
  constructor(private _fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private toastr: ToastrService,
    private ref:MatDialogRef<AddViviendaComponent>,
    private _viviendaService: ViviendaService){
      
      this.viviendaForm = this._fb.group({
        direccion: new FormControl(''),
        cantidad_habitaciones: new FormControl(''),
        cantidad_banos: new FormControl(''),
        metros_cuadrados: new FormControl(''),
        valor_uf: new FormControl(''),
        descripcion: new FormControl(''),
        url_imagen: new FormControl(''),
        comuna_id_comuna: new FormControl(''),
        inmobiliario_id_inmobiliario: new FormControl('')

      })
  }

  ngOnInit(): void {
    this.inputData=this.data;
    if(this.inputData.id>0){
      this.setDialogData(this.inputData.id) 
  }
}

  setDialogData(id:any){
    this._viviendaService.getViviendaID(id).subscribe(item=>{
      this.editData=item;
      console.log(this.editData)
      this.viviendaForm.setValue({
        direccion: this.editData.direccion,
        cantidad_habitaciones: this.editData.cantidad_habitaciones,
        cantidad_banos: this.editData.cantidad_banos,
        metros_cuadrados: this.editData.metros_cuadrados,
        valor_uf: this.editData.valor_uf,
        descripcion:this.editData.descripcion,
        url_imagen: this.editData.url_imagen,
        comuna_id_comuna: this.editData.comuna_id_comuna,
        inmobiliario_id_inmobiliario: this.editData.inmobiliario_id_inmobiliario
        })
    })
  }


  
  onFormSubmit(){
    if(this.viviendaForm.valid){
      if(this.data.id != 0){
        this._viviendaService.update(this.data.id,this.viviendaForm.value)
        .subscribe({
          next:(val:any) => {
            this.toastr.success('Vivienda Actualizado exitosamente','Actualizado')
            this.ngOnInit();
          }
        })
      }else{

        //Validacion nulos
        if(this.viviendaForm.value.direccion == '' || this.viviendaForm.value.cantidad_habitaciones=='' 
        || this.viviendaForm.value.cantidad_banos=='' || this.viviendaForm.value.metros_cuadrados =='' ||
        this.viviendaForm.value.valor_uf =='' || this.viviendaForm.value.url_imagen =='' || this.viviendaForm.value.inmobiliario_id_inmobiliario =='' ||
        this.viviendaForm.value.comuna_id_comuna ==''){
          this.toastr.error('Todos los campos deben estar completos.','Error')
        } else{
          this._viviendaService.register(this.viviendaForm.value).subscribe(data => {
            this.toastr.success('Vivienda registrado exitosamente','Registrado')
            this.ref.close()

          },error =>{
            console.log(error)
            this.toastr.error('La vivienda ya existe.','Error')
          })
        }
      }
   } else{
    this.toastr.error('El formulario debe rellenarse con datos validos.','Error')
   }
  }


}
