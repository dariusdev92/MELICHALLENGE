import { Request, Response } from "express";
import { GET, route } from "awilix-express";
import path from "path";

@route('/')
export default class IndexController
{
    constructor()
    {
        
    }

    @GET() 
    public getItemsFromQuery(request: Request, response: Response)
    {
        response.sendFile(path.join(__dirname, '../../client/public', 'index.html'));
    }
}