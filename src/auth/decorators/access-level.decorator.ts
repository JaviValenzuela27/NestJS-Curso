import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY } from 'src/constants/key-decorators';

//Decorador creado para el acceso a las rutas segun los roles
export const AccessLevel = (level: number) =>
  SetMetadata(ACCESS_LEVEL_KEY, level);
