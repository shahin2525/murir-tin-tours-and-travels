/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import { userRoutes } from './routes/user.route'
import cors from 'cors'
import { tourRoutes } from './routes/tour.route'
import { reviewRoutes } from './routes/review.route'

import globalErrorhandler from './middlewares/globalErrorHandler'
import notFound from './middlewares/notFoundRoute'
import globalRoutes from './routes'
// import notFound from './middlewares/notFoundRoute'
const app: Application = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1/', globalRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: 'true',
    message: 'welcome to murir tin',
  })
})

// global error handler
app.use(globalErrorhandler)

// catch all  not found route

app.use(notFound)

export default app
