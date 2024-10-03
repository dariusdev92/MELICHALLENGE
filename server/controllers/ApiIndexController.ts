import { Request, Response } from "express";
import { GET, route } from "awilix-express";
import MeliService from "../services/MeliService";
import HttpNotFoundError from "../errors/HttpNotFoundError";

@route('/api')
export default class ApiIndexController
{
    constructor
    (
        private meliService: MeliService 
    )
    {

    }
}