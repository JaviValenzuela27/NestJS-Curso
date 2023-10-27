import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

//Configuracion para las variables de entorno, se tomarán del archivo develop.env, se debe cambiar el script de ejecucion en el package.json
ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
});
//Se utiliza el servicio de la configuracion de las variables de entorno
const configService = new ConfigService();

//Se exporta la constante con la configuracion necesaria para la conexion mysql con la bdd, haciendo uso de las variables de entorno, las migraciones deben ejecutarse siempre que existan cambios en las entidades
export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  //Especifica ubicaciones de las entidades (Cualquier .entity en subdirectorios del proyecto)
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  //Busca los archivos de migraciones en el directorio "migrations"
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  //Las migraciones se gestionan manualmente
  synchronize: false,
  //Ejecucion automatica d ela smigraciones durante la inicializacion de la aplicacion
  migrationsRun: true,
  //Se desactiva el registro por consola de consultas SQL generadas por TypeORM
  logging: false,
  //Define estrategia para los nombres de las tablas y columnas en la bdd
  namingStrategy: new SnakeNamingStrategy(),
};

//Exporta la configuracion anterior
export const AppDS = new DataSource(DataSourceConfig);
