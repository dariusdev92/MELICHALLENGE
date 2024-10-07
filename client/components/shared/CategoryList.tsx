interface props
{
    list: string[] | undefined
}
export default function CategoryList({ list = [] }: props)
{
    const $categoryList = list.map( (categoryText, index) => <CategoryItem key={index.toString()} text={categoryText} /> );

    return <ol id="category-list" className="breadcrumb"> {$categoryList} </ol>;
}

function CategoryItem({ text = "" }: any)
{
    return <li><a href="">{text}</a></li>
}