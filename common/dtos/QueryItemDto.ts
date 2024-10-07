import PriceDto from "./PriceDto";

export default interface QueryItemDto
{    
    id: string,
    title: string,
    price: PriceDto,
    picture: string,
    condition: string,
    free_shipping: boolean,
    city: string
}