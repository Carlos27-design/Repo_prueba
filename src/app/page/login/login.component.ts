import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '../page.routing.module';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  loginForm : FormGroup;
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();
  loginFailed: boolean = false; // Variable para almacenar el estado de loginFailed


  constructor() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    console.log(this.loginForm);
   }

  ngOnInit(): void {
    this._authService.loginFailed$.subscribe(loginFailed => this.loginFailed = loginFailed);
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this._authService.login(username, password);
    this._authService.isAuthenticated$.subscribe(isAuthenticated => {
      this._authService.rol$.subscribe(rol => {
        if (isAuthenticated && rol==="profesor") {
          this._router.navigate(['/page/home']);
        } else if (isAuthenticated && rol==="alumno") {
          this._router.navigate(['/page/home']);
        } else if (isAuthenticated && rol==="admin") {
          this._router.navigate(['/page/home']);
        }else {
          this.loginFailed = true; // Mostrar mensaje de error si el login falla
        }

      });
    });


    }
  }

