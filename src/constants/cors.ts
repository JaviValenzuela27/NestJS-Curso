import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

//Constantes para configuracion de conexiones CORS
export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
};
