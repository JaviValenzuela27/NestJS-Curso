//Es para agregar estos parametros al Request nativo de Express para que aparezcan tipados cuando se necesite
declare namespace Express {
  interface Request {
    idUser: string;
    roleUser: string;
  }
}
