import { Request, Response } from "express";
import MeliService from "../services/MeliService";
import { GET, route } from "awilix-express";
import QueryResultDto from "../dtos/QueryResultDto";
import ItemResultDto from "../dtos/ItemResultDto";
import HttpNotFoundError from "../errors/HttpNotFoundError";

@route('/api/items')
export default class ApiItemController
{
    constructor
    (
        private meliService: MeliService 
    )
    {
          
    }

    @GET() 
    public async getItemsFromQuery(request: Request, response: Response<QueryResultDto>)
    {
        const query = request.query.q?.toString();

        if(query)
        {
            const items = await this.meliService.getItemsByQuery(query);
            response.json(items);
        }
        else
        {
            throw new HttpNotFoundError();
        }    
    }
    
    @GET()
    @route('/:id')
    public async getItemById(request: Request, response: Response<ItemResultDto>)
    {
        const itemId = request.params.id;    

        if(itemId)
        {
            const item = await this.meliService.getItemById(itemId);
            response.json(item);
        }
        else
        {
            throw new HttpNotFoundError();
        }
    }
}