import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';

//Decorador creado para el acceso a las rutas segun los roles
export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
