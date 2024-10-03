export interface MeliCategoryDto
{
    id: string,
    name: string,
    path_from_root: Array<{
        id: string,
        name: string
    }>
}