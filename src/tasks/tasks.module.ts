import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { ProjectsService } from 'src/projects/services/projects.service';

@Module({
  //Se importan las entidades de tareas y proyectos
  imports: [TypeOrmModule.forFeature([TasksEntity, ProjectsEntity])],
  //Se importan los servicios de tareas y proyectos
  providers: [TasksService, ProjectsService],
  controllers: [TasksController],
})
export class TasksModule {}
