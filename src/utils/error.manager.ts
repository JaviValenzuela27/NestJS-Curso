import { HttpException, HttpStatus } from '@nestjs/common';

//Manejador de errores en los procesos
export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  //Recibe un string como mensaje y devuelve una excepcion http con un mensaje de error y un estatus de la peticion http
  public static createSignatureError(message: string) {
    const name = message.split(' :: ')[0];
    if (name) {
      throw new HttpException(message, HttpStatus[name]);
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
