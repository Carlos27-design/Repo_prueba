import { Usuario } from './usuario.models';

export interface RegisterResponse {
  user: Usuario;
  token: string;
}
