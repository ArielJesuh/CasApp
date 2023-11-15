import { Component, OnInit ,ViewChild} from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';
import {  MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  listUsuarios: Usuario[] = []
  displayedColumns: string[] = ['id', 'nombre_usuario', 'password', 'email','run', 'telefono','tipo','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  userForm:FormGroup;

  constructor(private _fb:FormBuilder,
    private _userService: UserService, 
    private _dialog:MatDialog,
    private toastr:ToastrService,
    //@Inject(MAT_DIALOG_DATA) private data:any
    ){
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
    this.getListUsuarios()
    //this.userForm.patchValue(this.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getListUsuarios(){
    this._userService.getListUsuarios().subscribe((data: Usuario[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  )}

  addUsersDialog(id:any,title:any){
    this._dialog.open(AddUserComponent,{
      data:{title:title,
      id:id}
    });
  }

  reloadCurrentPage() {
    window.location.reload();
   }

  deleteUser(id:number){
    this._userService.deleteUser(id).subscribe({
      next:(res) => {
        this.toastr.success('Usuario eliminado exitosamente','Eliminado');

      },
      error:console.log
    });
    this.reloadCurrentPage()
  }

  openEditForm(id:any){
    this.addUsersDialog(id,'Editar Usuario')
  }

  openAddForm(){
    this.addUsersDialog(0,'Añadir Usuario')
  }
  
}
