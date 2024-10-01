import { Request, Response, NextFunction } from "express";
import HttpError from "./HttpError";
import HttpNotFoundError from "./HttpNotFoundError";
import logger from "../logger";

const parseRequest = (request: Request): any =>
{
    return {
        method: request.method,
        url: request.url,
        headers: request.headers,
        query: request.query,
        body: request.body,
    }
}

export default function ErrorHandler
(
    error: Error, 
    request: Request, 
    response: Response, 
    next: NextFunction
)
{
    if(error instanceof HttpError)
    {
        response.status(error.status).send(error.message).end();
    }
    else if(error instanceof HttpNotFoundError)
    {
        response.status(404).send(error.message).end();
    }
    else
    {        
        logger.error(error.message, parseRequest(request));
        response.status(500).send(error.message).end();
    }
}