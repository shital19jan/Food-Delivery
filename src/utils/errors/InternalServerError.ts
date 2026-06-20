import AppError from "./AppErrors";
import HTTP_STATUS from "../../constants/Httpstatus";

class InternalServerError extends AppError{
    constructor(message:string){
        super(message,HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
}

export default InternalServerError;