import { Component, OnInit, ViewChild } from '@angular/core';
import { Vivienda } from 'src/app/interfaces/vivienda';
import { ViviendaService } from 'src/app/services/vivienda.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder,FormControl,FormGroup} from '@angular/forms';
import { AddViviendaComponent } from '../add-vivienda/add-vivienda.component';
@Component({
  selector: 'app-admin-viv',
  templateUrl: './admin-viv.component.html',
  styleUrls: ['./admin-viv.component.css']
})
export class AdminVivComponent implements OnInit {
  listViviendas: Vivienda[] = []
  displayedColumns: string[] = ['id', 'direccion', 'cantidad_habitaciones', 'cantidad_banos','metros_cuadrados', 'valor_uf','descripcion','url_imagen','comuna_id_comuna','inmobiliario_id_inmobiliario','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  viviendaForm:FormGroup;
  constructor(private _fb:FormBuilder,
    private _viviendaService: ViviendaService,
    private _dialog:MatDialog,
    private toastr:ToastrService )
    {
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
    this.getListViviendas();
  }


  
  getListViviendas(){
    this._viviendaService.getListViviendas().subscribe((data: Vivienda[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  )}

  addViviendaDialog(id:any,title:any){
    this._dialog.open(AddViviendaComponent,{
      data:{title:title,
      id:id}
    });
  }

  reloadCurrentPage() {
    window.location.reload();
   }

   deleteVivienda(id:number){
    this._viviendaService.deleteVivienda(id).subscribe({
      next:(res) => {
        this.toastr.success('Vivienda Eliminada exitosamente','Eliminado');

      },
      error:console.log
    });
    this.reloadCurrentPage()
  }

  openEditForm(id:any){
    this.addViviendaDialog(id,'Editar Vivienda')
    console.log(id)
  }

  openAddForm(){
    this.addViviendaDialog(0,'Añadir Vivienda')
  }

}
