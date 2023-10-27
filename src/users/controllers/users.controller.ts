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
import { ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectsEntity } from 'src/projects/entities/projects.entity';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
//Ruta para acceder a usuarios
@Controller('users')
//Guards para proteger las rutas
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Registro de usuarios será una ruta pública
  @PublicAccess()
  //Ruta en que se registraran usuarios
  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    //Crea el usuario con base a la informacion validada en el DTO
    return await this.usersService.createUser(body);
  }

  //Solo usuarios con el acceso de administrador podrán listar todos los usuarios
  @AdminAccess()
  //Ruta en que se listarán todos los usuarios
  @Get('all')
  public async findAllUsers() {
    //Busca los usuarios
    return await this.usersService.findUsers();
  }

  @ApiParam({
    name: 'id',
  })
  @ApiHeader({
    name: 'user_token',
  })
  @ApiResponse({
    status: 400,
    description: 'No se encontro resultado',
  })
  //Solo usuarios con el acceso de administrador podrán listar todos los usuarios
  @Get(':id')
  //Recibe el id del usuario a buscar y lo busca en base a ello
  public async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  @ApiParam({
    name: 'projectId',
  })
  //Solo usuarios con nivel de acceso OWNER en el proyecto podran agregar otros usuarios al proyecto
  @AccessLevel('OWNER')
  //Ruta en que se llevará a cabo la peticiòn
  @Post('add-to-project/:projectId')
  public async addToProject(
    //Recibe el el body el DTO y como parametro el id del proyecto para asociar al usuario
    @Body() body: UserToProjectDTO,
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    //Guarda el usuario en el proyecto con la informacion enviada
    return await this.usersService.relationToProject({
      ...body,
      project: id as unknown as ProjectsEntity,
    });
  }

  @ApiParam({
    name: 'id',
  })
  //Solo usuarios con el acceso de administrador podrán editar un usuario
  @AdminAccess()
  //Ruta en que se editara un usuario
  @Put('edit/:id')
  //Actualiza el usuario con la informacion enviada desde el DTO
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @ApiParam({
    name: 'id',
  })
  //Solo usuarios con el acceso de administrador podrán eliminar un usuario
  //Ruta en que se eliminará un usuario
  @Delete('delete/:id')
  //Se pasa como parametro el id del usuario a eliminar y se intenta eliminar
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
