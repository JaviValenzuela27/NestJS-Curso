import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

//DTO para validar la Data de la informacion que se va a enviar para guardar un proyecto
export class ProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

//DTO para validar la data de la informacion que se va a enviar para actualizar un proyecto (Son opcionales)
export class ProjectUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
