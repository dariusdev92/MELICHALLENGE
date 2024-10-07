import { useLocation, useSearchParams } from "react-router-dom";
import CategoryList from "../shared/CategoryList";
import ProductItem from "../widgets/ProductItem";
import { ReactElement, useEffect, useState } from "react";
import ItemsHttpClient from "../../httpClients/ApiItemsHttpClient";
import QueryItemDto from "../../dtos/QueryItemDto";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import QueryResultDto from "../../dtos/QueryResultDto";

interface props
{
    result?: QueryResultDto
}

interface state
{
    result?: QueryResultDto,
    loading: boolean
}

// Scoped Helper
const setLoading = (loading: state['loading']) => (prevState: state): state =>
{
    return {
        ...prevState,
        loading
    }
}
    
const setResult = (result: state['result']) => (prevState: state): state =>
{
    return {
        ...prevState,
        result: result,
        loading: false
    }
}

const renderItems = (items: QueryItemDto[]): ReactElement[]  =>
{
    const list = items.map(item => (
        <li key={item.id} className="product-item">
            <ProductItem product={item} />
        </li>
    ));

    return list;
}

const getSkeleton = () => {

    return <>
        <Skeleton count={1} height={10} style={{ margin: '12px 0px' }}/>
        <SkeletonTheme baseColor="#fff" highlightColor="#eee">                                
            <Skeleton count={4} height={160}/>
        </SkeletonTheme>
    </>

}

export default function QueryResultPage({ result }: props)
{
    // Start
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    
    // State
    const [state, setState] = useState<state>({
        result: result,
        loading: result ? false : true
    });

    // Functions
    const getApiResult = async () => {
            
        if(!searchQuery) return;
        setState(setLoading(true));
        const apiResult = await ItemsHttpClient.SearchItemsByQueryAsync(searchQuery);
        setState(setResult(apiResult));
        
    };

    useEffect(() => {

        getApiResult();

    }, [location.search]);

    return <>
        <section id="results">
        {
            state.loading ?
            (
                getSkeleton()
            )
            :
            (
                <>
                    <CategoryList list={state.result?.categories} />
                    <ul id="product-list" className="card">
                        {
                            state.result?.items.length ? 
                            (
                                renderItems(state.result.items)
                            )
                            :
                            (
                                <p className="no-result-message">No se encontraron resultados para: {searchQuery}</p>
                            )
                        }
                    </ul>
                </>
            )
        }
        </section>
    </>
}