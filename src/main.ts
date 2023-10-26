import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Configuracion para tener logs de las visitas a las rutas (Imprime en consola las peticiones a las rutas)
  app.use(morgan('dev'));
  //Configuracion inicial para utilizar DTOs y validar la informacion con Class Validator
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //Configuracion para usar excepciones en class-transform
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  //Configuracion variables de entorno de forma global
  const configService = app.get(ConfigService);
  //Habilita el CORS para conexiones con Frontend
  app.enableCors(CORS);
  //Agrega prefijo "api" a todos las rutas
  app.setGlobalPrefix('api');
  //Puerto en que escucha la app con variables de entorno
  await app.listen(configService.get('PORT'));
  //Console.Log de la URL en la que escucha la aplicacion
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
