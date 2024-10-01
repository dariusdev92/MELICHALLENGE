export default interface MeliProductResultDto
{
    id: string,
    title: string,
    condition: string,
    thumbnail: string,
    price: number,
    currency_id: string,
    shipping: {
        free_shipping: boolean
    }
}