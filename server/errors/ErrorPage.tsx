import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom/server';
import App from "../../client/App";
import Helper from "../helpers/Helper";

export default async function getErrorPage(): Promise<string> 
{
    const appHtml = renderToString(
        <StaticRouter location="/notfound">
            <App />
        </StaticRouter>
    );

    const body = await Helper.renderHTML(appHtml);

    return body;

}