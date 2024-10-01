export default class NumericHelper
{
    static SplitPrice(price: number = 0): [ amount: number, decimals: number ]
    {
        const _price = price.toString();
        const [ amount = 0 , decimals = 0 ] = _price.split('.').map( number => parseInt(number) || 0 );
        return [ amount, decimals ];
    }
}