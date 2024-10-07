import ItemDto from "../../dtos/ItemDto";
import { getConditionText, getSoldQuantityText } from "../../helpers";
import BuyButton from "../shared/BuyButton";
import Price from "../shared/Price";
import XImage from "../shared/XImage";

interface props
{
    product: ItemDto
}

export default function ProductFullItem({ product }: props)
{  
    return (
        <article>

            <div className="product-info">                
                <XImage src={product.picture} alt={product.title} />
                {
                    product.description &&
                    <>
                        <h2>Descripción del producto</h2>
                        <p className="desc">{product.description}</p>
                    </>
                }
            </div>

            <div className="side-bar">
                <span className="meta-info">
                    <span className="condition">{getConditionText(product.condition)}</span>&nbsp;-&nbsp; 
                    <span className="sold-quantity">{getSoldQuantityText(product.sold_quantity)}</span>
                </span>

                <h1>{product.title}</h1>
                <Price price={product.price} freeShipping={product.free_shipping} />
                <BuyButton />
            </div>

        </article>   
    )

}