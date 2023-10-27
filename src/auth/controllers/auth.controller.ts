import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //Ruta en que se hará el Login de usuarios
  @Post('login')
  //Recibe usuario y contraseña
  async login(@Body() { username, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );
    //si el metodo retorna null los datos de inicio de sesión no son correctos
    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }
    //lLama al metodo para generar el JWT y lo retorna
    const jwt = await this.authService.generateJWT(userValidate);
    return jwt;
  }
}
