import ItemDto from "./ItemDto"

export default interface ItemResultDto
{
    author: {
        name: string
        lastname: string
    },

    categories: string[],

    item: ItemDto
}