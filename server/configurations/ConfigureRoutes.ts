import express from 'express';
import { AwilixContainer } from "awilix";
import { loadControllers } from "awilix-express";
import { Application } from "express";
import path from 'path';

/**
 * Configura los endpoints de la API
 * @param application Express JS Application
 * @param dependencyInjection Awilix Container
 */
export default function ConfigureRoutes
(
    application: Application, 
    dependencyInjection: AwilixContainer
)
{
    // Configura la carpeta 'public' como directorio de archivos estáticos
    application.use(express.static(path.join(__dirname, '../../client/public')));

    // Configuro los endpoints desde los Controllers con Awilix Express
    application.use(loadControllers('../controllers/*.ts', { cwd: __dirname }));
}