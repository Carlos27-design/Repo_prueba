import { inject, Injectable } from '@angular/core';
import { Rol } from '../models/rol.models';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private readonly _http = inject(HttpClient);

  public getAll(): Observable<Rol[]> {
    const url = `${environment.baseUrl}rol/`;
    return this._http.get<Rol[]>(url);
  }
}
