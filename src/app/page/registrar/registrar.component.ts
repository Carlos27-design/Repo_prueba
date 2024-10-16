import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  registrarForm: FormGroup;
  correoRecuperacion: string = '';

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController
  ) {
    this.registrarForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      número: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required],
      comuna: ['', Validators.required],
      correoRecuperacion: ['', [Validators.email]],
    });
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }



  // Validación para el botón de registro
  async onSubmit() {
    if (this.registrarForm.valid) {
      // Si el formulario es válido, mostrar mensaje de éxito
      await this.mostrarAlerta('Usuario registrado correctamente.');
      console.log('Datos registrados:', this.registrarForm.value);
    } else {
      // Si hay errores en el formulario, mostrar mensaje de error
      await this.mostrarAlerta('Usuario registrado correctamente.');
    }
  }

  // Validación para el botón de recuperación de contraseña
  async recuperarContrasena() {
    const correoRecuperacionControl = this.registrarForm.get('correoRecuperacion');

    if (correoRecuperacionControl && correoRecuperacionControl.valid) {
      // Si el correo de recuperación es válido
      await this.mostrarAlerta('Link enviado a example@duocuc.cl' + correoRecuperacionControl.value);
    } else {
      // Si el correo no es válido o está vacío
      await this.mostrarAlerta('Por favor ingresa un correo válido.');
    }
  }

  ngOnInit() {
    console.log('ngOnInit llamado');
  }
}
