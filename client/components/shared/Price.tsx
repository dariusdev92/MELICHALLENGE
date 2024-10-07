import { useEffect, useState } from "react";
import PriceDto from "../../dtos/PriceDto";
import { formatNumberWithDots, getCurrency } from "../../helpers";

interface props
{
    price: PriceDto
    freeShipping: boolean;
}

export default function Price({ price, freeShipping = false }: props)
{
    const [currency, setCurrency] = useState<string>('$');

    useEffect(() => {

        const setCurrencyAsync = async () => {

            const currencyResult = await getCurrency(price.currency);
            setCurrency(currencyResult.symbol);

        }

        setCurrencyAsync();

    }, [])

    return (
        <p className="price">
            <span className="currency">{currency}</span>
            <span className="amount">{formatNumberWithDots(price.amount)}</span>
            <span className="decimal">{price.decimals}</span>            
            {freeShipping && <FreeShipping />}
        </p>
    )
}

function FreeShipping()
{
    return (
        <span className="free-shipping on material-symbols-outlined" title="Envío gratis">local_shipping</span>
    )
}