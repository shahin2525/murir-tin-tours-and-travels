import express, { Application, Request, Response } from 'express'
import { userRoutes } from './routes/user.route'
import cors from 'cors'
import { tourRoutes } from './routes/tour.route'
import { reviewRoutes } from './routes/review.route'
import notFound from './controllers/notFound.controller'
const app: Application = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/tours/', tourRoutes)
app.use('/api/v1/reviews/', reviewRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: 'true',
    message: 'welcome to murir tin',
  })
})

// catch all route _trying to catch a not found route

// approach-1 for not found route
// app.all('*', notFound)
// approach-2 for not found route
app.use(notFound)

export default app
