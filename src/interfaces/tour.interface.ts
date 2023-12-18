/* eslint-disable @typescript-eslint/ban-types */
import { Model } from 'mongoose'

interface ITour {
  name: string
  durationHours: number
  ratingAverage: number
  ratingQuality: number
  price: number
  availableSeats: number
  imageCover: string
  images: string[]
  startLocation: string
  locations: string[]
  createdAt: Date
  startDates: Date[]

  slug: string
}

interface ITourMethods {
  getNextNearestStartDateAndEndDate(): {
    nearestStartDate: Date | null
    estimatedEndDate: Date | null
  }
}
type TTourModel = Model<ITour, {}, ITourMethods>
export { ITour, ITourMethods, TTourModel }
