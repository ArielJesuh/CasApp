import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { LeftPanelComponent } from '../app/components/left-panel/left-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from '../app/components/home/home.component';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './components/admin/admin.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddUserComponent } from './components/add-user/add-user.component';
import {MatTableModule} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MapComponent } from './map/map.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MetricasComponent } from './components/metricas/metricas.component';
import { CloseSessionComponent } from './components/close-session/close-session.component';
import { AdminVivComponent } from './components/admin-viv/admin-viv.component';
import { AddViviendaComponent } from './components/add-vivienda/add-vivienda.component';
import { GestionarViviendasComponent } from './components/gestionar-viviendas/gestionar-viviendas.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftPanelComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AddUserComponent,
    
    MapComponent,
          MetricasComponent,
          CloseSessionComponent,
          AdminVivComponent,
          AddViviendaComponent,
          GestionarViviendasComponent,
          ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    ToastrModule.forRoot(

    ),
    

    MatCardModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
