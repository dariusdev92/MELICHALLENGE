import { asClass, asValue, AwilixContainer } from "awilix";
import MeliHttpClient from "../httpClients/MeliHttpClient";
import MeliService from "../services/MeliService";
import { Application } from "express";
import logger from "../logger";
import winston from "winston";

/**
 * Configura la relación de dependencias con Awilix
 * @param application Express JS Application
 * @param dependencyInjection Awilix Container
 */
export default function ConfigureDependencyInjection
(
    application: Application, 
    dependencyInjection: AwilixContainer
)
{
    dependencyInjection.register({

        // HTTP Clients
        meliHttpClient: asClass(MeliHttpClient).transient(),
        
        // Services
        meliService: asClass(MeliService).transient(),
        
        // Util
        logger: asValue<winston.Logger>(logger),

    });
}