import { HttpStatusCode } from "axios";

export default class HttpError extends Error
{
    public status: HttpStatusCode = 500;

    constructor
    (
        message: string,        
        status: HttpStatusCode
    )
    {
        super(message);

        this.name = "HttpError";
        Object.setPrototypeOf(this, HttpError.prototype);
        this.status = status;
    }
}