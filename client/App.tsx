import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/HomePage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import QueryResultPage from "./components/pages/QueryResultPage";
import NoPage from "./components/pages/NoPage";
import QueryResultDto from "./dtos/QueryResultDto";
import ItemResultDto from "./dtos/ItemResultDto";

interface props
{ 
    state?: {
        queryResult?: QueryResultDto,
        productDetail?: ItemResultDto
    } 
}

export default function App({state = {}}: props)
{
    return <>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="items" element={<QueryResultPage result={state.queryResult} />} />
                <Route path="items/:id" element={<ProductDetailPage result={state.productDetail } />}  />
                <Route path="/notfound" element={<NoPage />} />
            </Route>
        </Routes>
    </>;
}