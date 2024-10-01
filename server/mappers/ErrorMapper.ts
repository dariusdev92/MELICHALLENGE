import HttpError from "../errors/HttpError";

export default class ErrorMapper
{
    static AnyToError(error: any): Error
    {
        const status = error.status;
        const message = error.message || 'Error';
    
        if(status)
        {
            return new HttpError(message, status);
        }
        else
        {
            return new Error(message);
        }
    }
}