import { AuthTokenResult, IUseToken } from 'src/auth/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

//Valida que el token sea valido y que no haya expirado
export const useToken = (token: string): IUseToken | string => {
  try {
    //Decodifica el token
    const decode = jwt.decode(token) as AuthTokenResult;

    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);
    //Regresa un objeto con el id del usuario, el rol y si el token ha expirado
    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    //Sino el token es invalido
    return 'Token is invalid';
  }
};
