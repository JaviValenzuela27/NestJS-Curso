import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository } from 'typeorm';
import { TasksDTO } from '../dto/tasks.dto';
import { TasksEntity } from '../entities/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    //Importacion entidad bdd para interactuar
    @InjectRepository(TasksEntity)
    private readonly taskRepository: Repository<TasksEntity>,
    //Importacion projectService para acceder a sus metodos
    private readonly projectService: ProjectsService,
  ) {}

  //Metodo para crear tarea (Recibe un cuerpo con la estructura de la tarea y un projectId para asociar la tarea al mismo)
  public async createTask(
    body: TasksDTO,
    projectId: string,
  ): Promise<TasksEntity> {
    try {
      //Se busca el proyecto por su id
      const project = await this.projectService.findProjectById(projectId);
      //Si no se encontró el proyecto se maneja el error
      if (project === undefined) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se ha encontrado el proyecto',
        });
      }
      //Guarda la tarea con la informacion de la tarea y el proyecto relacionado y la retorna
      return await this.taskRepository.save({
        ...body,
        project,
      });
    } catch (error) {
      //Maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
