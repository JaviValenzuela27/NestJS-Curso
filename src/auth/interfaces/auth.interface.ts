import { ROLES } from 'src/constants/roles';
import { UsersEntity } from 'src/users/entities/users.entity';

//Interfaz de datos que conriene el request con el payloadToken
export interface PayloadToken {
  sub: string;
  role: ROLES;
}

//Interfaz de datos del body de la peticiòn para hacer el Login
export interface AuthBody {
  username: string;
  password: string;
}

//Interfaz de datos que devuelve el login si se ha realizado exitosamente
export interface AuthResponse {
  accessToken: string;
  user: UsersEntity;
}

//Interfaz de datos que contiene el JSON Web Token
export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

//Interfaz del formato de datos que devuelve la autenticacion del token
export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
