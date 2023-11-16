import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { MapComponent } from './map/map.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { CompararComponent } from './components/comparar/comparar.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent },
  {path : 'register', component : RegisterComponent },
  {path : 'admin', component : AdminComponent },
  {path : 'metricas', component : MetricasComponent },
  {path : 'comparar', component: CompararComponent},


  {path : 'map', component : MapComponent},
  {path : '**', redirectTo:'login',pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
