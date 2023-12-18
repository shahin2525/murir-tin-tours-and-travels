import { Request, Response } from 'express'

const notFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: 'fail',
    message: `route not found for ${req.originalUrl}`,
  })
}

export default notFound
