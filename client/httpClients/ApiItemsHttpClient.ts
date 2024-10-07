import ItemResultDto from "../dtos/ItemResultDto";
import QueryResultDto from "../dtos/QueryResultDto";

export default class ItemsHttpClient
{
    public static async SearchItemsByQueryAsync(query: string): Promise<QueryResultDto>
    {
        return await fetch(`/api/items?q=${query}`).then<QueryResultDto>( result => result.json())
    }

    public static async GetItemByIdAsync(itemId: string): Promise<ItemResultDto>
    {
        return await fetch(`/api/items/${itemId}`).then<ItemResultDto>( result => result.json());
    }

    public static async GetCurrencyById(currencyId: string): Promise<any>
    {
        return await fetch(`https://api.mercadolibre.com/currencies/${currencyId}`).then(response => response.json());
    }
}