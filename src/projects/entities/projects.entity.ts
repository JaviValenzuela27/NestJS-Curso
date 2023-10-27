import { Column, Entity, OneToMany } from 'typeorm';
import { IProject } from '../../interfaces/project.interface';
import { BaseEntity } from '../../config/base.entity';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { TasksEntity } from '../../tasks/entities/tasks.entity';

//Entidad para la tabla projects con sus relaciones
@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;
  //Un proyecto puede estar a cargo de muchos usuarios
  @OneToMany(
    () => UsersProjectsEntity,
    (usersProjects) => usersProjects.project,
  )
  usersIncludes: UsersProjectsEntity[];

  //Un proyecto puede tener muchas tareas
  @OneToMany(() => TasksEntity, (tasks) => tasks.project)
  tasks: TasksEntity[];
}
