import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { STATUS_TASK } from 'src/constants/status-task';
import { ProjectDTO } from 'src/projects/dto/projects.dto';

//DTO con la los campos validados que se la tarea que se asociará al proyecto
export class TasksDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskDescription: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(STATUS_TASK)
  status: STATUS_TASK;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsableName: string;
  @ApiProperty()
  @IsOptional()
  //Puede o no asociarse a un proyecto
  project?: ProjectDTO;
}
