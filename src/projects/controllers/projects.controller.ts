import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsService } from '../services/projects.service';
@ApiTags('Projects')
//Ruta principal en la que se gestionarán los proyectos
@Controller('projects')
//Uso de guardias en las rutas de controlador
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @ApiParam({
    name: 'userId',
  })
  //Solo va a poder crear proyectos un usuario con el rol "CREATOR"
  @Roles('CREATOR')
  @Post('create/userOwner/:userId')
  public async createProject(
    @Body() body: ProjectDTO,
    @Param('userId') userId: string,
  ) {
    return await this.projectService.createProject(body, userId);
  }
  //Solo va a poder listar todos los proyectos un usuario con el rol "CREATOR" (Se hereda del anterior)
  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @ApiParam({
    name: 'projectId',
  })
  //Solo va a poder buscar un proyecto por id un usuario con el rol "CREATOR" (Se hereda del anterior)
  @Get(':projectId')
  public async findProjectById(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.findProjectById(id);
  }

  //Esta ruta será de acceso público (Listara la API de Rick & Morty)
  @PublicAccess()
  @Get('list/api')
  public async listApi() {
    return this.projectService.listApi();
  }

  @ApiParam({
    name: 'projectId',
  })
  //Solo un usuario con el nivel de acceso "OWNER" podrá editar un proyecto
  @AccessLevel('OWNER')
  @Put('edit/:projectId')
  public async updateProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @ApiParam({
    name: 'projectId',
  })
  //Solo un usuario con el nivel de acceso "OWNER" podrá eliminar un proyecto
  @AccessLevel('OWNER')
  @Delete('delete/:projectId')
  public async deleteProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.projectService.deleteProject(id);
  }
}
