import { Usuario } from './usuario.models';

export interface CheckTokenResponse {
  user: Usuario;
  token: string;
}
