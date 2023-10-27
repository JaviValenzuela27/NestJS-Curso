import { SetMetadata } from '@nestjs/common';
//Clave que se utilizará como metadato para identificar el rol de Administrador
import { ADMIN_KEY } from 'src/constants/key-decorators';
//Importa el enum con los roles disponibles
import { ROLES } from 'src/constants/roles';

//Devuelve el resultado de llamar SetMetaData al pasar la clave ADMIN_KEY y el rol de administrador
export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
