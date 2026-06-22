import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../constants/Httpstatus";
import MESSAGES from "../constants/Messages";
import ApiResponse from "../utils/ApiResponse";


const resOwnerMiddlware = (req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        return ApiResponse.error(
            res,
            HTTP_STATUS.UNAUTHORIZED,
            MESSAGES.UNAUTHORIZED
        );
    }
    if (user.role !== "RES_OWNER") {
        return ApiResponse.error(
            res,
            HTTP_STATUS.FORBIDDEN,
            " only RES_OWNER can add."
        );
    }

    next();
};

export default resOwnerMiddlware;