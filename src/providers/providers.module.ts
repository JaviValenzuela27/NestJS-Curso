import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HttpCustomService } from './http/http.service';

//Se configura de manera flobal
@Global()
@Module({
  //Se importa el HttpModule de Axios
  imports: [HttpModule],
  //Se importa el servicio
  providers: [HttpCustomService],
  //Se exportan ambos para usarlos fuera del modulo
  exports: [HttpModule, HttpCustomService],
})
export class ProvidersModule {}
