// Descargo estilo scss
require ('./styles/style.scss');

import 'react-loading-skeleton/dist/skeleton.css';

import { hydrateRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from 'react-router-dom';

const app = document.getElementById('root');
const state = (window as any)["__INITIAL_STATE__"];

if(app)
{
    const root = hydrateRoot
    (
        app, 
        <BrowserRouter>
            <App state={{...state}} />
        </BrowserRouter>
    );
}