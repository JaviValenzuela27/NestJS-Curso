import { SetMetadata } from '@nestjs/common';
//Clave que se utilizará como metadato para identificar el nivel de acceso
import { ACCESS_LEVEL_KEY } from 'src/constants/key-decorators';
//Enum con los diferentes niveles de acceso
import { ACCESS_LEVEL } from 'src/constants/roles';

//Recibe un nivel de acceso y devuelve el resultado de llamar SetMetaData al pasar la clave ACCESS_LEVEL_KEY y el nivel se acceso que se envió como parámetro
export const AccessLevel = (level: keyof typeof ACCESS_LEVEL) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
