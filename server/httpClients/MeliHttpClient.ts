import axios from 'axios';
import MeliProductsResultDto from '../dtos/meli/MeliProductsResultDto';
import MeliProductDetailDto from '../dtos/meli/MeliProductDetailDto';
import MeliProductDescriptionDto from '../dtos/meli/MeliProductDescriptionDto';
import ErrorMapper from '../mappers/ErrorMapper';
import winston from 'winston';
import MeliCurrencyDto from '../dtos/meli/MeliCurrencyDto';

const currencyDefaultValue: MeliCurrencyDto = {
    id: '',
    symbol: '$',
    description: '',
    decimal_places: 2
}

export default class MeliHttpClient
{
    constructor
    (
        private logger: winston.Logger
    )
    {          
    }

    async getCurrencyById(currencyId: string): Promise<MeliCurrencyDto>
    {
        const result = await  axios
                                .get<MeliCurrencyDto>(`https://api.mercadolibre.com/currencies/${currencyId}`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) })
                                .catch( () => { return currencyDefaultValue });
                                
        return result;
    }

    async getProductsByQuery(query: string): Promise<MeliProductsResultDto>
    {
        const result = await axios
                                .get<MeliProductsResultDto>(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) })
                                .catch( error => { throw ErrorMapper.AnyToError(error) });
        return result;
    }

    async getProductById(productId: string): Promise<MeliProductDetailDto>
    {
        const result = await axios
                                .get<MeliProductDetailDto>(`https://api.mercadolibre.com/items/${productId}`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) })
                                .catch( error => { throw ErrorMapper.AnyToError(error) });
        return result;
    }

    async getProductDescriptionById(productId: string): Promise<MeliProductDescriptionDto>
    {
        const result = await axios
                                .get<MeliProductDescriptionDto>(`https://api.mercadolibre.com/items/${productId}/description`)
                                .then( result => result.data )
                                .catch( error => { throw this.errorLogPipe(error) })
                                .catch( error => { throw ErrorMapper.AnyToError(error) });
        return result;
    }

    private errorLogPipe( error: any, ...meta: any[] ): any
    {
        this.logger.info(error.message, ...meta);
        return error;
    }
}