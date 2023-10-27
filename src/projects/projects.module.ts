import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';

@Module({
  imports: [
    //Importa las entidades de usuarios y pryectos que se utilizaran en el servicio
    TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity]),
    //Importa tambien el modulo de providers
    ProvidersModule,
  ],
  //Agrega los demas servicios que se involucraran en los procesos
  providers: [ProjectsService, UsersService, HttpCustomService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
