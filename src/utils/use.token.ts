import { AuthTokenResult, IUseToken } from 'src/auth/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

//Funcion para decodificar el token para ver si es valido y validar que no este ecpirado
export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;

    const currentDate = new Date();
    const expiredDate = new Date(decode.exp);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiredDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid';
  }
};
