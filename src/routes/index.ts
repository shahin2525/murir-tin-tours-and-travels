import express from 'express'
import routes from '../constant/routes.constant'

const globalRoutes = express.Router()

routes.forEach((item) => {
  globalRoutes.use(item.path, item.route)
})

export default globalRoutes
