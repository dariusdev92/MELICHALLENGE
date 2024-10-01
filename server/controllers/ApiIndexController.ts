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

    @GET()
    @route('/currency/:id')
    public async getCurrencySymbolById(request: Request, response: Response)
    {
        const currencyId = request.params.id;    

        if(currencyId)
        {
            const item = await this.meliService.getCurrencySymbol(currencyId);
            response.json(item);
        }
        else
        {
            throw new HttpNotFoundError();
        }
    }
}