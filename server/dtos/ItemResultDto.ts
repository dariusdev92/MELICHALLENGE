import { ItemDto } from "./item/ItemDto"

export default interface ItemResultDto
{
    author: {
        name: string
        lastname: string
    },

    categories: string[],

    item: ItemDto
}