import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ACCESS_LEVEL } from 'src/constants/roles';
import { HttpCustomService } from 'src/providers/http/http.service';
import { UsersProjectsEntity } from 'src/users/entities/usersProjects.entity';
import { UsersService } from 'src/users/services/users.service';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsEntity } from '../entities/projects.entity';

@Injectable()
export class ProjectsService {
  constructor(
    //Se inyecta lo necesario para trabajar
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
    private readonly usersService: UsersService,
    private readonly httpService: HttpCustomService,
  ) {}

  //Metodo para crear un proyecto, recibe un projecDTO y un id de usuario que trabajará en este proyecto
  public async createProject(body: ProjectDTO, userId: string): Promise<any> {
    try {
      //Busca el usuario por ID
      const user = await this.usersService.findUserById(userId);
      //Guarda el proyecto con el body
      const project = await this.projectRepository.save(body);
      //Guarda un registro en la tabla UsersProjects y asocia el proyecto con el usuario
      return await this.userProjectRepository.save({
        //Guarda el access level de este usuario como OWNER
        accessLevel: ACCESS_LEVEL.OWNER,
        //Guarda el user que se va a asociar
        user: user,
        //Guarda el proyecto relacionado
        project,
      });
    } catch (error) {
      //Maneja el posible error que ocurra
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //LISTA TODA LA INFORMACION DE LA API EXTERNA
  public async listApi() {
    return this.httpService.apiFindAll();
  }

  //BUSCA TODOS LOS PROYECTOS
  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      //Busca los proyectos
      const projects: ProjectsEntity[] = await this.projectRepository.find();
      //Si no hay proyectos, se maneja el error y se informa que no se encontraron resultados
      if (projects.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      //Se retorna el proyecto guardado
      return projects;
    } catch (error) {
      //Se maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //BUSCA UN PROYECTO POR ID
  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      //Realiza la consuta para buscar el usuario, consultando informacion en otras tablas
      const project = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
        .leftJoinAndSelect('usersIncludes.user', 'user')
        .getOne();
      //Si el proyecto no existe, se maneja el error
      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No existe proyecto con el id ' + id,
        });
      }
      //Se retorna el proyecto
      return project;
    } catch (error) {
      //Se maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //ACTUALIZA PROYECTOS (Recibe un body con informacion a actualizar y un id de proyecto)
  public async updateProject(
    body: ProjectUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      //Sino hay registros actualizados, se maneja el error
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar proyecto',
        });
      }
      //Se retorna el proyecto
      return project;
    } catch (error) {
      //Se maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //ELIMINA UN PROYECTO (RECIBE UN ID DE PROYECTO)
  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      //Intenta eliminar
      const project: DeleteResult = await this.projectRepository.delete(id);
      //Sino hay registros afectados, se maneja el error
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar proyecto',
        });
      }
      //Retorna el proyecto
      return project;
    } catch (error) {
      //Maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
