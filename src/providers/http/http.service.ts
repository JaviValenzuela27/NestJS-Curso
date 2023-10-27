import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}

  //Metodo para consumir api externa
  public async apiFindAll() {
    try {
      //Busca en la API
      const response = await firstValueFrom(
        this.httpService.get('https://rickandmortyapi.com/api/character'),
      );
      //Retorna la data obtenida
      return response.data;
    } catch (error) {
      //Gestiona los errores
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
