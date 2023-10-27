import { STATUS_TASK } from '../../constants/status-task';
import { ProjectsEntity } from '../../projects/entities/projects.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

//Entidad para la tabla tareas, con los tipos de datos correpondientes
@Entity({ name: 'task' })
export class TasksEntity extends BaseEntity {
  @Column()
  taskName: string;

  @Column()
  taskDescription: string;

  @Column({ type: 'enum', enum: STATUS_TASK })
  status: STATUS_TASK;

  @Column()
  responsableName: string;
  //Varias tareas pueden estar asociadas a un proyecto
  @ManyToOne(() => ProjectsEntity, (project) => project.tasks)
  //Especifica la columna que se utilizará como clave foranea
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectsEntity;
}
