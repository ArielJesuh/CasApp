import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { MapComponent } from './map/map.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { AdminVivComponent } from './components/admin-viv/admin-viv.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent },
  {path : 'register', component : RegisterComponent },
  {path : 'admin', component : AdminComponent },
  {path : 'metricas', component : MetricasComponent },
  {path : 'map', component : MapComponent},
  {path : 'admin-viv', component : AdminVivComponent},
  {path : '**', redirectTo:'',pathMatch:'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
