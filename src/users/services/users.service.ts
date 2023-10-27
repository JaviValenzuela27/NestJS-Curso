import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersEntity } from '../entities/users.entity';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {
  constructor(
    //Importacion entidad de usuarios
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    //Importacion entidad UsersProjects que es la relacion de usuarios con proyectos
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
  ) {}

  //Metodo para crear el usuario, recibe la data del usuario por el body
  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      //Se toma la contraseña y se encripta y luego se guarda encriptada en la bdd
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);
      return await this.userRepository.save(body);
    } catch (error) {
      //Se maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Metodo para buscar todos los usuarios
  public async findUsers(): Promise<UsersEntity[]> {
    try {
      //Busca los usuarios en la bdd
      const users: UsersEntity[] = await this.userRepository.find();
      //Sino se encuentran, se maneja el error
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay usuarios en la bdd',
        });
      }
      return users;
    } catch (error) {
      //Se maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Funcion para buscar un usuario por id(recibe un id de usuario)
  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      //Se hace una consulta para buscar el usuario y los proyectos asociados
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne();
      //Sino se encuentra, se maneja el error
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado',
        });
      }
      return user;
    } catch (error) {
      //Se maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Metodo para relacionar un usuario a un proyecto
  public async relationToProject(body: UserToProjectDTO) {
    try {
      //Guarda en la bdd
      return await this.userProjectRepository.save(body);
    } catch (error) {
      //Maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Busca usuario por un parametro en especifico(Recibe un nombre de campo y un valor)
  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      //Realiza la busqueda
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      //Se maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Metodo para actualizar el usuario (Recibe un body con la informacion a actualizar y el id del usuario a actualizar)
  public async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined> {
    try {
      //Actualiza el usuario
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        //Maneja el error
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return user;
    } catch (error) {
      //Maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  //Metodo para eliminar un usuario mediante un id
  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      //Intenta borrar el usuario
      const user: DeleteResult = await this.userRepository.delete(id);
      //Sino se elimina nada, se maneja el error
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar',
        });
      }
      return user;
    } catch (error) {
      //Se maneja el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
