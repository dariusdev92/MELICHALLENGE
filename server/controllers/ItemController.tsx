import { Request, Response } from "express";
import { GET, route } from "awilix-express";
import path from "path";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from "../../client/App";
import MeliService from "../services/MeliService";
import Helper from "../helpers/Helper";

@route('/items')
export default class ItemController
{

    constructor
    (
        private meliService: MeliService 
    )
    {
    }

    @GET() 
    public async getItemsFromQuery(request: Request, response: Response)
    {
        
        const search = request.query.search?.toString();

        if(search)
        {
            const result = await this.meliService.getItemsByQuery(search);
            const state = { queryResult: result }
            const appHtml = renderToString(
                <StaticRouter location={request.url}>
                    <App state={state} />
                </StaticRouter>
            );
            const body = await Helper.renderHTML(appHtml, state);

            response.send(body);
        }
        else
        {
            response.sendStatus(404);
        }  
    }
    
    @GET()
    @route('/:id')
    public async getItemById(request: Request, response: Response)
    {
        const itemId = request.params.id;

        if(itemId)
        {
            const result = await this.meliService.getItemById(itemId);
            const state = { productDetail: result }
            const appHtml = renderToString(
                <StaticRouter location={request.url}>
                    <App state={state} />
                </StaticRouter>
            );
            const body = await Helper.renderHTML(appHtml, state);

            response.send(body);
        }
        else
        {
            response.sendStatus(404);
        }
    }

}