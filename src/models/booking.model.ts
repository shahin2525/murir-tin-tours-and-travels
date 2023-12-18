import { Schema, model } from 'mongoose'
import { IBooking } from '../interfaces/booking.interface'

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  tour: { type: Schema.Types.ObjectId, ref: 'Tour' },
  bookingSlots: {
    type: Number,
    required: [true, 'A booking must have bookedSlot'],
  },
  price: { type: Number, required: [true, 'a booking must have price'] },
  bookingStatus: {
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    required: [true, 'A booking must have booking status'],
  },
})

const Booking = model<IBooking>('Booking', bookingSchema)

export default Booking
