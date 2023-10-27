//Se agregan las variables de entorno para que aparezcan tipadas cuando se necesite

declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    HASH_SALT: number;
    JWT_SECRET: string;
  }
}
