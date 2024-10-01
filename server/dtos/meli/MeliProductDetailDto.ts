export default interface MeliProductDetailDto
{
    id: string,
    title: string,
    price: number,
    currency_id: string,
    thumbnail: string,
    condition: string,
    initial_quantity: number,
    shipping: {
        free_shipping: boolean
    }
}