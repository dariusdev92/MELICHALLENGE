import ItemDetailDto from "../dtos/ItemDetailDto";
import ItemResultDto from "../dtos/ItemResultDto";
import ItemsQueryResultDto from "../dtos/ItemsQueryResultDto";
import MeliProductDescriptionDto from "../dtos/meli/MeliProductDescriptionDto";
import MeliProductDetailDto from "../dtos/meli/MeliProductDetailDto";
import MeliProductResultDto from "../dtos/meli/MeliProductResultDto";
import MeliProductsResultDto from "../dtos/meli/MeliProductsResultDto";
import MeliProductsResultFiltersDto from "../dtos/meli/MeliProductsResultFiltersDto";
import NumericHelper from "../helpers/NumericHelper";

export default class MeliApiMapper
{
    /**
     * Mapeo la categorías del resultado de búsqueda de la API de MLA
     * a partir de los filtros. 
     * @param filters Filtro del resultado de búsqueda
     * @returns Path de categorías
     */
    static ResultFiltersToItemsCategories(filters: MeliProductsResultFiltersDto[]): string[]
    {
        const categoriesFilter = filters.find( filter => filter.id = 'category' );
        const productCategories = categoriesFilter?.values[0];

        if(productCategories)
        {
            const itemCategories = productCategories.path_from_root.map( category => category.name );
            return itemCategories;
        }
        else
        {
            return [];
        }
    }

    /**
     * Mapeo los datos del producto del resultado de búsqueda de la API de MLA.
     * @param product 
     * @returns 
     */
    static ProductResultToItemResult(product: MeliProductResultDto): ItemResultDto
    {
        // Esqueleto por defecto
        const item: ItemResultDto = {
            id: "",
            title: "",
            price: {
                currency: "",
                amount: 0,
                decimals: 0
            },
            picture: "",
            condition: "",
            free_shipping: false
        }

        // Obtengo los decimales del precio
        const [ amount, decimals ] = NumericHelper.SplitPrice(product.price);

        // Mapeo los datos
        item.id = product.id;
        item.title = product.title;
        item.price.currency = product.currency_id;
        item.price.amount = amount;
        item.price.decimals = decimals;
        item.picture = product.thumbnail;
        item.condition = product.condition;
        item.free_shipping = product.shipping?.free_shipping || item.free_shipping;

        return item;
    }

    /**
     * Mapeo el resultado de la búsqueda de la API de MLA.
     * @param productsResult 
     * @returns 
     */
    static ProductsResultToItems(productsResult: MeliProductsResultDto): ItemsQueryResultDto
    {   
        // Esqueleto por defecto
        const itemsResult: ItemsQueryResultDto = {
            author: {
                name: "Darío",
                lastname: "Gómez Fisicaro"
            },
            categories: [],
            items: []
        };

        // Mapeos
        itemsResult.categories = MeliApiMapper.ResultFiltersToItemsCategories(productsResult.filters);
        itemsResult.items = productsResult.results?.map<ItemResultDto>( product => MeliApiMapper.ProductResultToItemResult(product) );

        return itemsResult;
    }

    /**
     * Mapeo los detalles de un producto de la API de MLA.
     * @param productDetail 
     * @param productDescription 
     * @returns 
     */
    static ProductsDetailToItemsDetail
    (
        productDetail: MeliProductDetailDto,
        productDescription: MeliProductDescriptionDto
    )
    : ItemDetailDto
    {
        // Esqueleto por defecto
        const itemDetail: ItemDetailDto = {
            author: {
                name: "Darío",
                lastname: "Gómez Fisicaro"
            },
            item: {
                id: "",
                title: "",
                price: {
                    currency: "",
                    amount: 0,
                    decimals: 0
                },
                picture: "",
                condition: "",
                free_shipping: false,
                sold_quantity: 0,
                description: ""
            }
        }

        // Obtengo los decimales del precio
        const [ amount, decimals ] = NumericHelper.SplitPrice(productDetail.price);

        // Mapeo
        itemDetail.item.id = productDetail.id;
        itemDetail.item.title = productDetail.title;
        itemDetail.item.picture = productDetail.thumbnail;
        itemDetail.item.condition = productDetail.condition;
        itemDetail.item.free_shipping = productDetail.shipping?.free_shipping || itemDetail.item.free_shipping;
        itemDetail.item.sold_quantity = productDetail.initial_quantity;
        itemDetail.item.price.currency = productDetail.currency_id;       
        itemDetail.item.price.amount = amount;     
        itemDetail.item.price.decimals = decimals;      
        itemDetail.item.description = productDescription.plain_text;

        return itemDetail;
    }
}