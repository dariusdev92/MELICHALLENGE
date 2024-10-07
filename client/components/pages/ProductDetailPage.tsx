import { useParams } from "react-router-dom";
import ItemResultDto from "../../dtos/ItemResultDto";
import CategoryList from "../shared/CategoryList";
import { useEffect, useState } from "react";
import ItemsHttpClient from "../../httpClients/ApiItemsHttpClient";
import ProductFullItem from "../widgets/ProductFullItem";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface props
{
    result?: ItemResultDto;
    [x: string]: unknown;
}

interface state
{
    result?: ItemResultDto;
    loading: boolean;
}

// Scoped Helper
const setLoading = (loading: state['loading']) => (prevState: state): state =>
{
    return {
        ...prevState,
        loading
    }
}
    
const setResult = (result?: state['result']) => (prevState: state): state =>
{
    return {
        ...prevState,
        result: result,
        loading: false
    }
}

const getSkeleton = () => 
{
    return <>
        <Skeleton count={1} height={10} style={{ margin: '12px 0px' }}/>
        <SkeletonTheme baseColor="#fff" highlightColor="#eee">                                
            <Skeleton count={1} height={500}/>
        </SkeletonTheme>
    </>
}

export default function ProductDetailPage({ result }: props)
{   
    // Start
    const { id } = useParams();

    // State
    const [state, setState] = useState<state>({
        result: result,
        loading: result ? false : true
    });

    // Functions
    async function getApiResult()
    {
        if(!id) return;
        setState(setLoading(true));
        ItemsHttpClient.GetItemByIdAsync(id)
            .then(result => setState(setResult(result)))
            .catch( err => setState(setResult()))
        ;
    }

    useEffect(() => {

        getApiResult();

    }, []);
    
    return <>
        <section>
            {
                state.loading ?
                (
                    getSkeleton()
                )
                :
                (
                    <>
                        <CategoryList list={result?.categories} />
                        <div id="item-detail" className="card">
                            {
                                state.result?.item ? 
                                (
                                    <ProductFullItem product={state.result.item} />
                                )
                                :
                                (
                                    <p>No se encontró el producto</p>                        
                                )
                            }
                        </div>
                    </>
                )
            }

        </section>
    </>
}