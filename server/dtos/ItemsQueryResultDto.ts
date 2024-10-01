import ItemResultDto from "./ItemResultDto"

export default interface ItemsQueryResultDto
{
    author: {
        name: string
        lastname: string
    },

    categories: string[],

    items: ItemResultDto[]
}