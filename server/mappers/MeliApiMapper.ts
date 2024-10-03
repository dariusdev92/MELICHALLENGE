import ItemResultDto from "../dtos/ItemResultDto";
import QueryItemDto from "../dtos/item/QueryItemDto";
import QueryResultDto from "../dtos/QueryResultDto";
import { MeliCategoryDto } from "../dtos/meli/MeliCategoryDto";
import MeliProductDescriptionDto from "../dtos/meli/MeliProductDescriptionDto";
import MeliProductDto from "../dtos/meli/MeliProductDto";
import MeliQueryProductDto from "../dtos/meli/MeliQueryProductDto";
import MeliQueryResultDto from "../dtos/meli/MeliQueryResultDto";
import Helper from "../helpers/Helper";
import MeliSellerDto from "../dtos/meli/MeliSellerDto";

// const getQualityPictureFromProduct = (prdouct: MeliProductDetailDto, minWidth:number = 720 ): string => {

//     const thumbnail = prdouct.thumbnail;
//     const pictures = prdouct.pictures || [];
//     const defaultPicture = pictures[0];
//     const bestPicture = pictures.find(picture => {
//         const size = picture.max_size;
//         const width = parseInt(size.split('x')[0]);
//         return width && width >= minWidth;
//     });

//     return bestPicture?.url || defaultPicture?.url || thumbnail;
// }

export default class MeliApiMapper
{
    /**
     * Mapeo la categorías del resultado de búsqueda de la API de MLA
     * a partir de los filtros. 
     * @param filters Filtro del resultado de búsqueda
     * @returns Path de categorías
     */
    static ItemsCategories(categories: MeliCategoryDto | undefined): string[]
    {
        if(categories)
        {
            const itemCategories = categories.path_from_root.map( category => category.name );
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
    static ProductResultToItemResult(product: MeliQueryProductDto, seller: MeliSellerDto | null): QueryItemDto
    {
        // Esqueleto por defecto
        const item: QueryItemDto = {
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
            city: ""
        }

        // Obtengo los decimales del precio
        const [ amount, decimals ] = Helper.SplitPrice(product.price);

        // Mapeo los datos
        item.id = product.id;
        item.title = product.title;
        item.price.currency = product.currency_id;
        item.price.amount = amount;
        item.price.decimals = decimals;
        item.picture = product.thumbnail;
        item.condition = product.condition;
        item.free_shipping = product.shipping?.free_shipping || item.free_shipping;
        item.city = seller?.address?.city || item.city;

        return item;
    }

    /**
     * Mapeo el resultado de la búsqueda de la API de MLA.
     * @param productsResult 
     * @returns 
     */
    static ProductsResultToItems(productsResult: MeliQueryResultDto, sellers:Array<MeliSellerDto | null>): QueryResultDto
    {   
        // Esqueleto por defecto
        const itemsResult: QueryResultDto = {
            author: {
                name: "Darío",
                lastname: "Gómez Fisicaro"
            },
            categories: [],
            items: []
        };

        const categoryFilter = productsResult.filters.find( filter => filter.id = 'category' );
        const productCategory = <MeliCategoryDto>categoryFilter?.values[0];

        // Mapeos
        itemsResult.categories = MeliApiMapper.ItemsCategories(productCategory);
        itemsResult.items = productsResult.results?.map<QueryItemDto>((product, index) => {

            const seller = sellers[index];
            const model = MeliApiMapper.ProductResultToItemResult(product, seller);
            return model;

        });

        return itemsResult;
    }

    /**
     * Mapeo los detalles de un producto de la API de MLA.
     * @param productDetail 
     * @param productDescription 
     * @returns 
     */
    static ProductDetailToItemDetail
    (
        productDetail: MeliProductDto,
        productDescription: MeliProductDescriptionDto,
        category: MeliCategoryDto | undefined
    )
    : ItemResultDto
    {
        // Esqueleto por defecto
        const itemDetail: ItemResultDto = {
            author: {
                name: "Darío",
                lastname: "Gómez Fisicaro"
            },
            categories: [],
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
        const [ amount, decimals ] = Helper.SplitPrice(productDetail.price);
        
        // Mapeo
        itemDetail.item.id = productDetail.id;
        itemDetail.item.title = productDetail.title;
        itemDetail.item.picture = productDetail.pictures[0]?.url || productDetail.thumbnail;
        itemDetail.item.condition = productDetail.condition;
        itemDetail.item.free_shipping = productDetail.shipping?.free_shipping || itemDetail.item.free_shipping;
        itemDetail.item.sold_quantity = productDetail.initial_quantity;
        itemDetail.item.price.currency = productDetail.currency_id;       
        itemDetail.item.price.amount = amount;     
        itemDetail.item.price.decimals = decimals;      
        itemDetail.item.description = productDescription.plain_text;

        itemDetail.categories = MeliApiMapper.ItemsCategories(category);

        return itemDetail;
    }
}