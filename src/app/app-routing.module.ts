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
import { AdminGuard  } from './guards/admin-guard.guard';
import { CompararComponent } from './components/comparar/comparar.component';
import { ViviendaComponent } from './components/vivienda/vivienda.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';

const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'login', component : LoginComponent },
  {path : 'register', component : RegisterComponent },
  {path : 'admin', component : AdminComponent,canActivate:[AdminGuard] },
  {path : 'metricas', component : MetricasComponent, canActivate:[AdminGuard] },
  {path : 'map', component : MapComponent,canActivate:[AdminGuard]},
  {path : 'admin-viv', component : AdminVivComponent,canActivate:[AdminGuard]},
  {path : 'gestionar-viviendas', component : GestionarViviendasComponent,canActivate:[AdminGuard]},
  {path : 'profile', component : ProfileComponent,canActivate:[AdminGuard]},
  {path: 'recuperar-pass',component : RecuperarPassComponent},
  {path : 'comparar', component: CompararComponent, canActivate:[AdminGuard]},
  {path: 'vivienda/:id', component: ViviendaComponent, canActivate:[AdminGuard]},
  {path: 'favoritos', component: FavoritosComponent, canActivate:[AdminGuard]},

  {path : '**', redirectTo:'home',pathMatch:'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
