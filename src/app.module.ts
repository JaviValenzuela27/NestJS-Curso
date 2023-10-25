import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //Importacion de variables de entorno (Se modifica en el .JSON por el nombre del .env)
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
