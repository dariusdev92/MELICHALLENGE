import ItemsHttpClient from "../httpClients/ApiItemsHttpClient";

export function formatNumberWithDots(number: number) 
{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function setJsonStorage(itemName: string, jsonObject: any)
{   
    const jsonValue = JSON.stringify(jsonObject);
    localStorage.setItem(itemName, jsonValue);
}

export function getJsonStorage(itemName: string)
{
    const jsonValue = localStorage.getItem(itemName);

    if(jsonValue)
    {
        const jsonObject = JSON.parse(jsonValue);
        return jsonObject;
    }
}

export async function getCurrency(currencyId: string): Promise<{ symbol: string }>
{
    const currencyName = `CURRENCY_${currencyId}`;
    let currency = getJsonStorage(currencyName);

    if(currency)
    {
        return currency;
    }
    else
    {
        currency = await ItemsHttpClient.GetCurrencyById(currencyId);
        setJsonStorage(currencyName, currency);
        return currency;
    }   
}

export function getConditionText(condition: 'new' | string)
{
    if(condition == 'new')
    {
        return 'Nuevo';
    }
    else
    {
        return 'Usado';
    }
}

export function getSoldQuantityText(soldQuantity: number)
{
    if(soldQuantity > 0)
    {
        if(soldQuantity > 1)
        {
            return `${soldQuantity} vendidos`;
        }
        else
        {
            return `${soldQuantity} vendido`;
        }
    }
    else
    {
        return '';
    }
}