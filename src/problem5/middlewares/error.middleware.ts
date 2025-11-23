import { Request, Response, NextFunction } from "express";
import { constants } from 'http2'

import { HttpError } from "../errors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error != null) {
    if (error instanceof HttpError) {
      res.status(error.code).json(error)
    } else {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: error.message })
    }
  }
};