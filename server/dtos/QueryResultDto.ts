import QueryItemDto from "./item/QueryItemDto"

export default interface QueryResultDto
{
    author: {
        name: string
        lastname: string
    },

    categories: string[],

    items: QueryItemDto[]
}