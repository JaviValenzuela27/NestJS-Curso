import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthBody } from '../interfaces/auth.interface';

//Campos que se enviaran en el cuerpo de la solicitud de Login
export class AuthDTO implements AuthBody {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
