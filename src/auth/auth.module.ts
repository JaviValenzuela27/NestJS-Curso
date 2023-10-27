import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';

//Se cofigura de manera global para acceder desde otros modulos
@Global()
@Module({
  //Se importa el UsersModule y UsersService ya que se usarán servicios del Modulo de usuarios
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
