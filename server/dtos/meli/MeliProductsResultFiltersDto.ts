export default interface MeliProductsResultFiltersDto
{
    id: string,
    values: Array<{
        id: string,
        name: string,
        path_from_root: Array<{
            id: string,
            name: string
        }>
    }>
}