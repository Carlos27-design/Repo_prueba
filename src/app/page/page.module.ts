import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageRoutingModule } from './page.routing.module'; // Mantén solo esta importación

// Importación de componentes
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { QrComponent } from './qr/qr.component';
import { VistaAlumnoComponent } from './vista-alumno/vista-alumno.component';
import { VistaProfesorComponent } from './vista-profesor/vista-profesor.component';
import { LogoutComponent } from './logout/logout.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
    RecuperarComponent,
    HomeComponent,
    LogoutComponent,
    QrComponent,
    VistaAlumnoComponent,
    VistaProfesorComponent,
    RegistrarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PageRoutingModule, // Aquí solo debes usar el PageRoutingModule
    SharedModule,
    RouterModule,
  ],

  providers: [AuthService],
})
export class PageModule {}
