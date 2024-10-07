function formatNumberWithDots(number) 
{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function setJsonStorage(itemName, jsonObject)
{   
    const jsonValue = JSON.stringify(jsonObject);
    localStorage.setItem(itemName, jsonValue);
}

function getJsonStorage(itemName)
{
    const jsonValue = localStorage.getItem(itemName);

    if(jsonValue)
    {
        const jsonObject = JSON.parse(jsonValue);
        return jsonObject;
    }
}

async function getCurrency(currencyId)
{
    const currencyName = `CURRENCY_${currencyId}`;
    let currency = getJsonStorage(currencyName);

    if(currency)
    {
        return currency;
    }
    else
    {
        currency = await fetch(`https://api.mercadolibre.com/currencies/${currencyId}`)
                                .then(response => response.json());
        setJsonStorage(currencyName, currency);
        return currency;
    }   
}

function getConditionText(condition)
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

function getSoldQuantityText(soldQuantity)
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