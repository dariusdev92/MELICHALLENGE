import axios from 'axios';
import MeliQueryResultDto from '../dtos/meli/MeliQueryResultDto';
import MeliProductDto from '../dtos/meli/MeliProductDto';
import MeliProductDescriptionDto from '../dtos/meli/MeliProductDescriptionDto';
import ErrorMapper from '../mappers/ErrorMapper';
import winston from 'winston';
import { MeliCategoryDto } from '../dtos/meli/MeliCategoryDto';
import MeliSellerDto from '../dtos/meli/MeliSellerDto';

export default class MeliHttpClient
{
    constructor
    (
        private logger: winston.Logger
    )
    {          
    }

    /**
     * Obtengo información de una categoría en la api de ML
     * @param categoryId 
     * @returns 
     */
    async getCategory(categoryId: string): Promise<MeliCategoryDto | undefined>
    {
        const result = await axios
                                .get<MeliCategoryDto>(`https://api.mercadolibre.com/categories/${categoryId}`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) })
                                .catch( () => { return undefined });                
        return result;
    }

    /**
     * Obtengo información de un vendedor en la api de ML
     * @param sellerId 
     * @returns 
     */
    async getSellerById(sellerId: number): Promise<MeliSellerDto>
    {
        const result = await axios
                                .get<MeliSellerDto>(`https://api.mercadolibre.com/users/${sellerId}`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) });  
        return result;
    }

    /**
     * Obtengo lista de productos mediante una consulta en la api de ML
     * @param query 
     * @returns 
     */
    async getProductsByQuery(query: string): Promise<MeliQueryResultDto>
    {
        const result = await axios
                                .get<MeliQueryResultDto>(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) })
                                .catch( error => { throw ErrorMapper.AnyToError(error) });
        return result;
    }

    /**
     * Obtengo información de un producto en la api de ML
     * @param productId 
     * @returns 
     */
    async getProductById(productId: string): Promise<MeliProductDto>
    {
        const result = await axios
                                .get<MeliProductDto>(`https://api.mercadolibre.com/items/${productId}`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) })
                                .catch( error => { throw ErrorMapper.AnyToError(error) });
        return result;
    }

    /**
     * Obtengo descripción de un producto en la api de ML
     * @param productId 
     * @returns 
     */
    async getProductDescriptionById(productId: string): Promise<MeliProductDescriptionDto>
    {
        const result = await axios
                                .get<MeliProductDescriptionDto>(`https://api.mercadolibre.com/items/${productId}/description`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) })
                                .catch( error => { throw ErrorMapper.AnyToError(error) });
        return result;
    }

    /**
     * Loggeo los errores de las consultas HTTP
     * @param error 
     * @param meta 
     * @returns 
     */
    private errorLogPipe( error: any, ...meta: any[] ): any
    {
        this.logger.info(error.message, ...meta);
        return error;
    }
}