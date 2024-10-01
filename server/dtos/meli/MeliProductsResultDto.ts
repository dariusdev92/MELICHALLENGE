import MeliProductResultDto from "./MeliProductResultDto"
import MeliProductsResultFiltersDto from "./MeliProductsResultFiltersDto"

export default interface MeliProductsResultDto
{    
    results: MeliProductResultDto[],
    filters: MeliProductsResultFiltersDto[]
}