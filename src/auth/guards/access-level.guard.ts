import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  ACCESS_LEVEL_KEY,
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/constants/key-decorators';
import { ACCESS_LEVEL, ROLES } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    //Se usa para acceder a metadatos de los decoradores
    private readonly reflector: Reflector,
    //Se usa para interactuar con informacion de los usuarios
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    //Verifica si la ruta es publica
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
    //Verifica el nivel de acceso asociado a la ruta
    const accessLevel = this.reflector.get<keyof typeof ACCESS_LEVEL>(
      ACCESS_LEVEL_KEY,
      context.getHandler(),
    );
    //Verifica si el usuario asociado a la ruta es un admin
    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    //Se accede a la informacion del request
    const req = context.switchToHttp().getRequest<Request>();
    //Se toman el rol de usuario y el id de usuario que vienen en la solicitud http
    const { roleUser, idUser } = req;
    //Si el nivel de acceos no esta definido y el rol no esta definido
    if (accessLevel === undefined) {
      if (roles === undefined) {
        //Si el usuario no es un admin, da paso a la ruta
        if (!admin) {
          return true;
          //Si el rol de usuario de la peticion es igual a Admin y admin existe, se da acceso a la ruta
        } else if (admin && roleUser === admin) {
          return true;
        } else {
          //Lanza excepcion para decir que no tiene permisos para esta operacion
          throw new UnauthorizedException(
            'No tienes permisos para esta operacion',
          );
        }
      }
    }

    //Si el usuario tiene rol de ADMIN o CREATOR, da acceso a la ruta
    if (roleUser === ROLES.ADMIN || roleUser === ROLES.CREATOR) {
      return true;
    }
    //Se encuentra el usuario buscandolo por su id
    const user = await this.userService.findUserById(idUser);

    //Se verifica si el usuario pertenece al proyecto especificado
    const userExistInProject = user.projectsIncludes.find(
      (project) => project.project.id === req.params.projectId,
    );

    if (userExistInProject === undefined) {
      throw new UnauthorizedException('No formas parte del proyecto');
    }
    //Se compara si el usuario tiene el nivel de acceso necesario para acceder a la ruta
    if (ACCESS_LEVEL[accessLevel] > userExistInProject.accessLevel) {
      throw new UnauthorizedException('No tienes el nivel de acceso necesario');
    }

    return true;
  }
}
