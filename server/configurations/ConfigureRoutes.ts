import express from 'express';
import { AwilixContainer } from "awilix";
import { loadControllers } from "awilix-express";
import { Application } from "express";
import path from 'path';
import Helper from '../helpers/Helper';
import getErrorPage from '../errors/ErrorPage';

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
    application.use(express.static(path.join(__dirname, '../../public')));

    // Configuro los endpoints desde los Controllers con Awilix Express
    application.use(loadControllers('../controllers/*.ts', { cwd: __dirname }));
    application.use(loadControllers('../controllers/*.tsx', { cwd: __dirname }));

    application.get('/api/*', (request, response) => {

        response.status(404).send('404 NOT FOUND');

    });

    const errorPage = getErrorPage();

    application.get('*', async (request, response) => {

        response.status(404).send(await errorPage);

    });
}