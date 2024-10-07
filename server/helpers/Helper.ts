import fs from 'fs';
import path from 'path';

const indexFile = path.resolve(path.join(__dirname, '../../public', 'index.html'));

export default class Helper
{
    static SplitPrice(price: number = 0): [ amount: number, decimals: number ]
    {
        const _price = price.toString();
        const [ amount = 0 , decimals = 0 ] = _price.split('.').map( number => parseInt(number) || 0 );
        return [ amount, decimals ];
    }

    static IndexHtmlString: string = '';

    static async GetIndexHtmlToStringAsync(): Promise<string>
    {
        let result = Helper.IndexHtmlString;

        if(!result)
        {
            result = await new Promise<string>((resolve, reject) => {

                fs.readFile(indexFile, 'utf-8', (error, htmlData) => {
    
                    if(error)
                    {
                        reject(new Error(error.message));
                    }
                    else
                    {
                        resolve(htmlData);
                    }
    
                })
    
            });
        }

        return result;
    }
}