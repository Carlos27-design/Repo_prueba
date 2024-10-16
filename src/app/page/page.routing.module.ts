import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QrComponent } from './qr/qr.component';
import { VistaAlumnoComponent } from './vista-alumno/vista-alumno.component';
import { VistaProfesorComponent } from './vista-profesor/vista-profesor.component';
import { LogoutComponent } from './logout/logout.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { RegistrarComponent } from './registrar/registrar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'qr', component: QrComponent },
  { path: 'vista-alumno', component: VistaAlumnoComponent },
  { path: 'vista-profesor', component: VistaProfesorComponent },
  { path: 'registrar', component: RegistrarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
