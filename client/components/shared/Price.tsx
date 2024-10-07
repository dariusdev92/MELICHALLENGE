import { useEffect, useState } from "react";
import PriceDto from "../../dtos/PriceDto";
import { formatDecimals, formatNumberWithDots, getCurrency } from "../../helpers";

interface props
{
    price: PriceDto
    freeShipping?: boolean;
    hasDecimals?: boolean;
}

export default function Price({ price, hasDecimals = true, freeShipping = false }: props)
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
            { hasDecimals && <span className="decimal">{formatDecimals(price.decimals)}</span> }            
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