import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    //Se usa para interactuar con informacion de los usuarios
    private readonly userService: UsersService,
    //Se usa para acceder a metadatos de los decoradores
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    //Si es publica, da acceso a la ruta
    if (isPublic) {
      return true;
    }
    //Se accede a la informacion del request
    const req = context.switchToHttp().getRequest<Request>();
    //Guarda en la constante token, el token que viene en la cabecera llamado "user_token"
    const token = req.headers['user_token'];
    //Si token no existe o es un arreglo, significa que no es valido
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token');
    }

    //Verifica que el token no haya expirado y sea valido
    const manageToken: IUseToken | string = useToken(token);

    //Si retorna un string es que el token es invalido
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }
    //Si el token ya expiró, no da acceso a la ruta
    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired');
    }
    //Guarda el id del usuario al que se refiere el token
    const { sub } = manageToken;
    //Busca el usuario por el id
    const user = await this.userService.findUserById(sub);
    //Sie verifica si el usuario existe en la bdd
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }
    //Agrega el valor del id del usuario al request
    req.idUser = user.id;
    //Agrege el rol del usuario al request para determinar los permisos y la autorización del usuario en las rutas protegidas.
    req.roleUser = user.role;
    //Si esto se cumple, el usuario está autenticado y autorizado para acceder a la ruta protegida
    return true;
  }
}
