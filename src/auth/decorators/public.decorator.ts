import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from 'src/constants/key-decorators';

//Decorador creado para el acceso a las rutas publicas
export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
