import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TasksDTO } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';
@ApiTags('Tasks')
//Ruta en la que se harán las peticiones a tareas
@Controller('tasks')
//Guards para proteger las rutas
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiParam({
    name: 'projectId',
  })
  //A partir del accessLevel Developer se podran crear tareas
  @AccessLevel('DEVELOPER')
  //Ruta en la que se agregaran las nuevas tareas
  @Post('create/:projectId')
  //Recibe un DTO con la informacion validada de las tareas y un parametro con el id del proyecto a asociar la tarea
  public async createTask(
    @Body() body: TasksDTO,
    @Param('projectId') projectId: string,
  ) {
    //Retorna la informacion de la tarea creada
    return await this.tasksService.createTask(body, projectId);
  }
}
