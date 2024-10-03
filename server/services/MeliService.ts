import ItemResultDto from "../dtos/ItemResultDto";
import MeliQueryResultDto from "../dtos/meli/MeliQueryResultDto";
import MeliSellerDto from "../dtos/meli/MeliSellerDto";
import QueryResultDto from "../dtos/QueryResultDto";
import MeliHttpClient from "../httpClients/MeliHttpClient";
import MeliApiMapper from "../mappers/MeliApiMapper";

export default class MeliService
{
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
     * @returns {QueryResultDto} Objeto ItemsQueryResultDto
     */
    public async getItemsByQuery(query: string): Promise<QueryResultDto>
    {
        const products = await this.meliHttpClient.getProductsByQuery(query);

        // Obtengo los primeros 4 resultados
        products.results = products.results.slice(0, 4);

        // Obtengo información del seller
        const sellers = await this.getSellersFromQueryResult(products);

        // Mapeo los datos
        const result = MeliApiMapper.ProductsResultToItems(products, sellers);

        return result;
    }

    /**
     * Obtiene información de un producto desde la API de MLA
     * y los mapea a un objeto que implementa la interface ```ItemDetailDto```
     * @param {string} itemId Id del item a buscar
     * @returns {ItemResultDto} Objecto ItemDetailDto
     */
    public async getItemById(itemId: string): Promise<ItemResultDto>
    {   
        // Disparo las consultas asyncronicas simultaneamente
        const productAsync = this.meliHttpClient.getProductById(itemId);
        const productDescriptionAsync = this.meliHttpClient.getProductDescriptionById(itemId);
        const categoryAsync =  productAsync.then(product => this.meliHttpClient.getCategory(product.category_id));
        
        // Espero los resultados para continuar
        const [ product , productDescription, category ] = await Promise.all([ productAsync , productDescriptionAsync, categoryAsync ]);
        
        // Mepeo los datos
        const result = MeliApiMapper.ProductDetailToItemDetail(product, productDescription, category);

        return result;
    }

    //#region private

    /**
     * Obtengo el seller para cada resultado y los devuelvo en el mismo orden
     * @param queryResult 
     * @returns 
     */
    private async getSellersFromQueryResult(queryResult: MeliQueryResultDto): Promise<Array<MeliSellerDto | null>>
    {   
        const sellersAsync = queryResult.results.map( product => {
            return this.meliHttpClient
                            .getSellerById(product.seller.id)
                            .catch( err => null );
        });

        const sellers = await Promise.all(sellersAsync);

        return sellers;
    }

    //#endregion
}