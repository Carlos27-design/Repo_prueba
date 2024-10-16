import { Rol } from './../../models/rol.models';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  registrarForm: FormGroup;
  private readonly authService = inject(AuthService);
  private readonly rolService = inject(RolService);
  private readonly _router = inject(Router);
  public roles: Rol[] = [];

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.registrarForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  // Validación para el botón de registro
  public async onSubmit(): Promise<void> {
    if (!this.registrarForm.valid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const { nombre, correo, contrasena, role } = this.registrarForm.value;

    this.authService.register(nombre, correo, contrasena, role).subscribe({
      next: async () => {
        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          message: 'Usuario registrado exitosamente',
          buttons: ['OK'],
        });
        await alert.present();
        this._router.navigateByUrl('/page/home');
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: `Error al registrar usuario: ${
            err.message || 'Intente nuevamente'
          }`,
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  private getRoles(): void {
    this.rolService.getAll().subscribe({
      next: (roles: Rol[]) => {
        this.roles = roles; // Asigna los roles
      },
      error: (err) => {
        console.error('Error al obtener roles:', err); // Manejo de errores
      },
    });
  }

  ngOnInit() {
    this.getRoles();
  }
}
