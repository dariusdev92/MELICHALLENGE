import HttpError from "./HttpError"

export default class HttpNotFoundError extends Error
{
    constructor
    (
        message: string = "404 Not Found"
    )
    {
        super(message);
        Object.setPrototypeOf(this, HttpNotFoundError.prototype);
        this.name = "HttpNotFoundError";
    }
}