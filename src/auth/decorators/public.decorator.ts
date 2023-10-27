import { SetMetadata } from '@nestjs/common';
//Clave que se utilizará como metadato para identificar el rol de Acceso Publico
import { PUBLIC_KEY } from 'src/constants/key-decorators';

//Devuelve el resultado de llamar SetMetaData al pasar la clave PUBLIC_KEY y colocar verdadero para verificar que se dará acceso a rutas públicas
export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
