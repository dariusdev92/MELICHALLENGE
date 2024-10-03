import { MeliCategoryDto } from "./MeliCategoryDto"
import MeliQueryProductDto from "./MeliQueryProductDto"
import MeliFiltersDto from "./MeliFiltersDto"

export default interface MeliQueryResultDto
{    
    results: MeliQueryProductDto[],
    filters: MeliFiltersDto<any | MeliCategoryDto>[]
}