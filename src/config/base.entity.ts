import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//Entidad base (Debe ser de tipo abstracta, que contiene los campos generales que se reutilizarán en todas las demás entidades)
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
