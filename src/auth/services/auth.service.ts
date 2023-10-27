import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthResponse, PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  //Se importa el usersService
  constructor(private readonly userService: UsersService) {}
  //FUNCION QUE VALIDA EL USUARIO PARA VER SI LAS CREDENCIALES SON CORRECTAS
  public async validateUser(
    username: string,
    password: string,
  ): Promise<UsersEntity | null> {
    //Busca un usuario por username
    const userByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    //Busca un usuario por email
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });
    //Valida que si el username existe, compare la contraseña enviada mediante body coincida con la contraseña hasheada guardada en la bdd
    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }
    //Valida que si el email existe, compare la contraseña enviada mediante body coincida con la contraseña hasheada guardada en la bdd
    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }
    //Si no valida, retorna null
    return null;
  }

  //FUNCION QUE FIRMA EL JSON WEB TOKEN (Recibe el payload de los datos relevantes para realizar operaciones, la clave secreta para firmar el token del .env y el tiempo de expiracion del mismo)
  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }): string {
    //Returna un string con el token creado y firmado
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  //FUNCION QUE GENERA EL JSON WEB TOKEN
  public async generateJWT(user: UsersEntity): Promise<AuthResponse> {
    const getUser = await this.userService.findUserById(user.id);

    //Fuarda la carga util (Informacion que se guardará en el JWT)
    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    //Retorna el JWT firmado y la informacion del usuario
    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h',
      }),
      user,
    };
  }
}
