export default interface MeliProductDto
{
    id: string,
    title: string,
    price: number,
    category_id: string,
    currency_id: string,
    thumbnail: string,
    condition: string,
    initial_quantity: number,
    shipping: {
        free_shipping: boolean
    },
    pictures: Array<{
        url: string,
        max_size: string
    }>
}