import { ROLES } from 'src/constants/roles';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}

export interface AuthBody {
  username: string;
  password: string;
}

//Interfaz del resultado del token
export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

//Interfaz para verificar si el token ha expirado
export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
