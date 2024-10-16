import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _rolService = inject(RolService);
  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();
  loginFailed: boolean = false; // Variable para almacenar el estado de loginFailed

  constructor() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    console.log(this.loginForm);
  }

  ngOnInit(): void {}

  onSubmit() {
    const { username, password } = this.loginForm.value;

    this._authService.login(username, password).subscribe(
      () => {
        const token = localStorage.getItem('token');

        // Si no hay token, redirigir al login
        if (!token) {
          this._router.navigate(['page/login']);
          return; // Salimos de la función sin retorno
        }

        // Decodifica el token
        const decodedToken: any = jwtDecode(token);
        const userRoleId = decodedToken.roles; // Asegúrate de que esto sea un ID

        if (!userRoleId) {
          this._router.navigate(['page/login']);
          return; // Salimos de la función sin retorno
        }

        // Definir las rutas según el rol
        const roleRoutes: { [key: string]: string } = {
          '6710292d55b49be53e555962': 'page/home',
          '670ca07faf1e9510e0ea0cf2': 'page/vista-profesor',
          '670ca153af1e9510e0ea0cf4': 'page/vista-alumno',
        };

        const redirectTo = roleRoutes[userRoleId]; // Ruta a la que redirigir según el rol

        // Redirigir si se encontró una ruta
        if (redirectTo) {
          this._router.navigate([redirectTo]);
        } else {
          this._router.navigate(['page/login']); // Redirigir si no se encuentra el rol
        }
      },
      () => {
        this.loginFailedSubject.next(true);
      }
    );
  }
}
