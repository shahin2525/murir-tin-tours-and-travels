import { Schema, model } from 'mongoose'
import { ITour, ITourMethods, TTourModel } from '../interfaces/tour.interface'
import slugify from 'slugify'

const tourSchema = new Schema<ITour, TTourModel, ITourMethods>(
  {
    name: {
      type: String,
      required: [true, 'please tell us your name'],
    },
    durationHours: {
      type: Number,
      required: [true, 'please tell us your duration'],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuality: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'please tell us your price'],
    },
    availableSeats: {
      type: Number,
      required: [true, 'Please Tells us your available'],
    },
    imageCover: {
      type: String,
      required: [true, 'please tell us your coverImage'],
    },
    images: {
      type: [String],
    },
    startLocation: {
      type: String,
      required: [true, 'please tell us your startLocation'],
    },
    locations: {
      type: [String],
      // required: [true, 'please tell us your email'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    startDates: [Date],
    slug: {
      type: String,
      // required: [true, 'please tell us your email'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
)
tourSchema.virtual('durationDays').get(function () {
  return this.durationHours / 24
})
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id',
})

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})
tourSchema.methods.getNextNearestStartDateAndEndDate = function (): {
  nearestStartDate: Date | null
  estimatedEndDate: Date | null
} {
  const today = new Date()
  const futureDates = this.startDates.filter((startDate: Date) => {
    return startDate > today
  })

  futureDates.sort((a: Date, b: Date) => a.getTime() - b.getTime())
  const nearestStartDate = futureDates[0]
  const estimatedEndDate = new Date(
    nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000,
  )
  return {
    nearestStartDate,
    estimatedEndDate,
  }
}

const Tour = model<ITour, TTourModel>('Tour', tourSchema)

export default Tour
