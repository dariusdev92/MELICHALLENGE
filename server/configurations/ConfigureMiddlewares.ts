import { AwilixContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application, NextFunction, Request, Response } from "express";

/**
 * Configura los middlewares de la API
 * @param application Express JS Application
 * @param dependencyInjection Awilix Container
 */
export default function ConfigureMiddlewares
(
    application: Application, 
    dependencyInjection: AwilixContainer
)
{
    application.use(scopePerRequest(dependencyInjection));
}