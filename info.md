-- Conceptos basicos, cosas que se pueden hacer en Nest --
En nestJS puedo crear REST APIs Y GraphQL APIs
Motores de plantillasÑ Handlebars que usan MVC
NestJS organiza los proyectos a través de módulos
Cada ruta (/users, /companies, etc...), cada una de estas puede ser un modulo en nestjs
Los modulos pueden estar divididos en controladores y servicios.
-Controladores: Definen rutas y metodos HTTP (Get, Post, Delete, Patch, Put)
-Servicios: Permiten comunicarse con otros servicios u otros backends (Aqui va la lógica de negocio)
\*Controladores y servicios pueden tener sus archivos de Testing
PROVIDERS: Permiten copartir e inyectar logica en toda la aplicacion
ENTITIES: Permiten definir Tablas o colecciones de bdd
DTOs: Para definir que datos el cliente está enviando al Backend
MIDDLEWARES: Funciones que procesan algo antes de llegar al controlador
PIPES,GUARDS,INTERCEPTOS, CUSTOM DECORATORS
NestCli;nest g controller,service,module,resource
Ya viene configurado con framework de Testing Jest para hacer End to End Testing

-- FUNCIONAMIENTO DE NEST JS (ARQUITECTURA) --
Nest Inicia en los servicios, los controladores es el punto final que expone los datos en base a httprequest al cliente.
Servicios proveen la logica y manipulacion de los datos que vienen del servicio o de las entidades o modelos (bdd).
Entidades se inyectan en servicios, servicios se inyectan en controladores y todo esto se inyecta en el modulo.
El modulo es el inicializador de todas esas acciones.
Cada modulo va a ser declarado(importado) dentro del app module.
Este app module se ejecuta dentro del archivo main.

-- DOCUMENTACION DE NEST --
https://docs.nestjs.com/

Instalacion cliente NestJS:
npm i -g @nestjs/cli
nest --version

Comenzar un nuevo proyecto:
nest new project-name

Instalar node en Ubuntu
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
node --version

CREAR EL MODULO PRIMERO QUE TODO
"nest" en la consola me trae todas las opciones de comandos
nest g mo users
nest g s users
nest g s users/services/users --flat
nest g co users/controllers/users --flat

\*Chequear Postgress y DockerCompose
Se puede usar Prisma,pero ya trae modulo TypeORM instalado
npm install --save @nestjs/typeorm typeorm mysql2
DatSource se usa para poder correr migraciones tambien (no necesariamente el server debe estar encendido)

npm i typeorm-naming-strategies
rutas relativas en todos los archivos(migracione)
npm run m:run (Ejecutarlo)
npm run m:gen -- ./migrations/init
npm run m:gen -- ./src/migrations/init
Eliminar migraciones i hay problemas de compilacion

Guards ejecutan o no un endpoint en base a si esta validado
https://jwt.io/
https://app.quicktype.io/

envfilePath en WINDOWS: envFilePath: `.${process.env.NODE_ENV.trim()}.env`
script en package.json: "start:dev": "set NODE_ENV=develop && nest start --watch",
