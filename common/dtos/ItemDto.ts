import PriceDto from "./PriceDto";

export default interface ItemDto
{
    id: string,
    title: string,
    price: PriceDto,
    picture: string,
    condition: string,
    free_shipping: boolean,
    sold_quantity: number,
    description: string
}