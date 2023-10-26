import { AuthBody } from '../interface/auth.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO implements AuthBody {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
