import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export function defaultErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res.status(500).send({
    message: 'Something Went Wrong!',
  });
}
