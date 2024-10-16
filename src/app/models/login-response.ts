import { Usuario } from './usuario.models';

export interface LoginResponse {
  user: Usuario;
  token: string;
}
