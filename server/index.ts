import express, { Application, NextFunction, Request, Response } from 'express';
import ConfigureDependencyInjection from './configurations/ConfigureDependencyInjection';
import ConfigureMiddlewares from './configurations/ConfigureMiddlewares';
import { createContainer, InjectionMode } from 'awilix';
import ConfigureRoutes from './configurations/ConfigureRoutes';
import ErrorHandler from './errors/ErrorHandler';

// Valores y servicios para el arranque de la aplicación
const port = 3000;
const application: Application = express();
const dependencyInjection = createContainer({
  injectionMode: InjectionMode.CLASSIC
})

// Configuraciones
ConfigureDependencyInjection(application, dependencyInjection);
ConfigureMiddlewares(application, dependencyInjection);
ConfigureRoutes(application, dependencyInjection);

// Manejo de errores
application.use(ErrorHandler);

// Inicio HOST
application.listen(port, () => {
  console.log(`Open http://localhost:${port}`);
})