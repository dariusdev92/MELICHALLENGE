import { Request, Response } from "express";
import { GET, route } from "awilix-express";
import path from "path";

@route('/items')
export default class ItemController
{
    constructor()
    {

    }

    @GET() 
    public getItemsFromQuery(request: Request, response: Response)
    {
        const search = request.query.search?.toString();

        if(search)
        {
            response.sendFile(path.join(__dirname, '../../client/public', 'result.html'));
        }
        else
        {
            response.sendStatus(404);
        }  
    }
    
    @GET()
    @route('/:id')
    public getItemById(request: Request, response: Response)
    {
        const itemId = request.params.id;

        if(itemId)
        {
            response.sendFile(path.join(__dirname, '../../client/public', 'detail.html'));
        }
        else
        {
            response.sendStatus(404);
        }
    }
}