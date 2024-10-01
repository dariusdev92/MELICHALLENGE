import ItemDetailDto from "../dtos/ItemDetailDto";
import ItemsQueryResultDto from "../dtos/ItemsQueryResultDto";
import MeliHttpClient from "../httpClients/MeliHttpClient";
import MeliApiMapper from "../mappers/MeliApiMapper";

export default class MeliService
{
    static currencySymbol: Map<string, string> = new Map();

    constructor
    (
        private meliHttpClient: MeliHttpClient
    )
    {
    }

    /**
     * Obtiene resultados de búsqueda desde la API de MLA y los
     * mapea a un objeto que implementa la interface ```ItemsQueryResultDto```
     * @param {string} query Texto de la consulta
     * @returns {ItemsQueryResultDto} Objeto ItemsQueryResultDto
     */
    public async getItemsByQuery(query: string): Promise<ItemsQueryResultDto>
    {
        const products = await this.meliHttpClient.getProductsByQuery(query);

        // Obtengo los primeros 4 resultados
        products.results = products.results.slice(0, 4);

        // Mapeo los datos
        const result = MeliApiMapper.ProductsResultToItems(products);

        return result;
    }

    /**
     * Obtiene información de un producto desde la API de MLA
     * y los mapea a un objeto que implementa la interface ```ItemDetailDto```
     * @param {string} itemId Id del item a buscar
     * @returns {ItemDetailDto} Objecto ItemDetailDto
     */
    public async getItemById(itemId: string): Promise<ItemDetailDto>
    {   
        // Disparo las dos consultas asyncronicas simultaneamente
        const productAsync = this.meliHttpClient.getProductById(itemId);
        const productDescriptionAsync = this.meliHttpClient.getProductDescriptionById(itemId);
        
        // Espero el resultado de ambos para continuar
        const [ product , productDescription ] = await Promise.all([ productAsync , productDescriptionAsync ]);
        
        // Mepeo los datos
        const result = MeliApiMapper.ProductsDetailToItemsDetail(product, productDescription);

        return result;
    }

    /**
     * Busca el sombolo de una divisa, en caso de no tenerlo
     * lo busca desde la API de MLA, lo guarda y lo retorna.
     * @param {string} currencyId Id de la divisa a buscar 
     * @returns {string} Simbolo de la divisa
     */
    public async getCurrencySymbol(currencyId: string): Promise<string>
    {
        let symbol = MeliService.currencySymbol.get(currencyId);

        if(symbol)
        {
            return symbol;
        }
        else
        {            
            const currency = await this.meliHttpClient.getCurrencyById(currencyId);
            symbol = currency.symbol;
            MeliService.currencySymbol.set(currencyId, symbol);
            return symbol;
        }
    }
}