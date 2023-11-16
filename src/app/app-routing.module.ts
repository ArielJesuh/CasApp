import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { MapComponent } from './map/map.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { AdminVivComponent } from './components/admin-viv/admin-viv.component';
import { GestionarViviendasComponent } from './components/gestionar-viviendas/gestionar-viviendas.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecuperarPassComponent } from './components/recuperar-pass/recuperar-pass.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent },
  {path : 'register', component : RegisterComponent },
  {path : 'admin', component : AdminComponent },
  {path : 'metricas', component : MetricasComponent },
  {path : 'map', component : MapComponent},
  {path : 'admin-viv', component : AdminVivComponent},
  {path : 'gestionar-viviendas', component : GestionarViviendasComponent},
  {path : 'profile', component : ProfileComponent},
  {path: 'recuperar-pass',component : RecuperarPassComponent},

  {path : '**', redirectTo:'',pathMatch:'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
