import { Global, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersProjectsEntity } from './entities/usersProjects.entity';
//Se define de manera global
@Global()
@Module({
  //Se importan las tablas de usuarios y de usuarios relacionada con proyectos
  imports: [TypeOrmModule.forFeature([UsersEntity, UsersProjectsEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  //Exportaciones para usar en otros modulos
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
