//Es para agregar estos parametros al Request nativo de Express
declare namespace Express {
  interface Request {
    idUser: string;
    roleUser: string;
  }
}
