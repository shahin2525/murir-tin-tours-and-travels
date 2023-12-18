/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

/* eslint-disable @typescript-eslint/no-explicit-any */
const globalErrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'something went wrong'
  const status = err.status || 'error'
  res.status(statusCode).json({
    status,
    message,
  })
}

export default globalErrorhandler
