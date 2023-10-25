import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

//Configuracion credenciales CORS en una constante
export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
};
