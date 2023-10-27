import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    //Si es publica, da acceso a la ruta
    if (isPublic) {
      return true;
    }
    //Verifica si hay roles especificos asociados a la ruta
    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );
    //Verifica si el usuario asociado a la ruta es un admin
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    //Se accede a la informacion del request
    const req = context.switchToHttp().getRequest<Request>();
    //Se obtiene el rol de usuario que viene en el Request
    const { roleUser } = req;

    //Si no se han definido roles específicos para esta ruta o punto final.
    if (roles === undefined) {
      if (!admin) {
        //Si no se han definido roles y no hay un rol de administrador (admin), se permite el acceso. Esto significa que la ruta es pública y cualquier usuario puede acceder.
        return true;
        // Si se ha definido un rol de administrador (admin) y el rol del usuario (roleUser) coincide con el rol de administrador, se permite el acceso. Esto es útil para permitir que los administradores accedan a ciertas rutas incluso si no se han definido roles específicos.
      } else if (admin && roleUser === admin) {
        return true;
      } else {
        //El usuario no tiene permisos
        throw new UnauthorizedException(
          'No tienes permisos para esta operacion',
        );
      }
    }

    //Comprueba si el rol del usuario es igual a administrador para dar el acceso
    if (roleUser === ROLES.ADMIN) {
      return true;
    }
    //Verifica si el rol de usuario coincide con alguno de los roles permitidos
    const isAuth = roles.some((role) => role === roleUser);

    if (!isAuth) {
      throw new UnauthorizedException('No tienes permisos para esta operacion');
    }
    return true;
  }
}
