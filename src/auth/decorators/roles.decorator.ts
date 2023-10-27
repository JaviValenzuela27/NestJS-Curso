import { SetMetadata } from '@nestjs/common';
//Clave que se utilizará como metadato para identificar el rol permitido en las operaciones
import { ROLES_KEY } from 'src/constants/key-decorators';
//Importa el enum con los roles disponibles
import { ROLES } from 'src/constants/roles';

//Recibe un rol especifico y devuelve el resultado de llamar SetMetaData al pasar la clave ROLES_KEY y el rol que se envia como parametro
export const Roles = (...roles: Array<keyof typeof ROLES>) =>
  SetMetadata(ROLES_KEY, roles);
