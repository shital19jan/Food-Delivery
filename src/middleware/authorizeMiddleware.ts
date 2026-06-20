import { Request, Response, NextFunction } from "express";
import ApiResponse from "../utils/ApiResponse";
import HTTP_STATUS from "../constants/Httpstatus";
import MESSAGES from "../constants/Messages";

const authorize =
  (...roles: string[]) =>
  (req: any, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGES.UNAUTHORIZED
      );
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.FORBIDDEN,
        "You are not authorized to perform this action."
      );
    }

    next();
  };

export default authorize;