import { FormEvent } from "react";
import QueryItemDto from "../../dtos/QueryItemDto"
import Price from "../shared/Price"
import XImage from "../shared/XImage";
import { useNavigate } from "react-router-dom";

interface props
{
    product: QueryItemDto
}

export default function ProductItem({ product }: props)
{
    // Start
    const navigate = useNavigate();

    // Props
    const price = product.price;
    const freeShipping = product.free_shipping;
    const src = product.picture;
    const productUrl = `/items/${product.id}`

    // Handlers
    const handleOnClick = (event: FormEvent<HTMLAnchorElement>) => {

        event.preventDefault();

        navigate(productUrl);
        
    }

    return (
        <article>

            <XImage src={src} alt={product.title} />

            <div className="product-info">              
                <Price {...{ price, freeShipping }} />
                <h2><a href={productUrl} onClick={handleOnClick}>{product.title}</a></h2>
            </div>

            <div className="seller-info">
                <p className="city">{product.city}</p>
            </div>

        </article>
    )
}