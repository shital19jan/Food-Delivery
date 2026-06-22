import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../constants/Httpstatus";
import MESSAGES from "../constants/Messages";
import ApiResponse from "../utils/ApiResponse";

const authorizeMiddleware =
  (req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
      );
    }
if(user.role !== "ADMIN"){
      return ApiResponse.error(
        res,
        HTTP_STATUS.FORBIDDEN,
        " only ADMIN has authority."
      );
    }

    next();
  };

export default authorizeMiddleware;