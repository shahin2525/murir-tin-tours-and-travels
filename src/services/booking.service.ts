import { startSession } from 'mongoose'
import { IBooking } from '../interfaces/booking.interface'
import Booking from '../models/booking.model'
import Tour from '../models/tour.model'

const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
  // create transaction
  const session = await startSession()

  // start transaction
  session.startTransaction()
  try {
    const booking = await Booking.create([bookingData], { session })

    if (!booking) {
      throw new Error('booking failed to create ')
    }

    const tour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      {
        $inc: { availableSeats: -booking[0].bookingSlots },
      },
      {
        session,
        new: true,
        runValidators: true,
      },
    )
    if (!tour) {
      throw new Error('Tour update in booking failed')
    }

    await session.commitTransaction()
    await session.endSession()

    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  // return result
}
const getAllBookings = async (): Promise<IBooking[]> => {
  const result = await Booking.find()
  return result
}
const getAllBookingsOfUser = async (id: string): Promise<IBooking[]> => {
  const result = await Booking.find({
    user: id,
  })
  return result
}
const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById(id)
  return result
}
const updateBooking = async (
  id: string,
  bookingData: IBooking,
): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndUpdate(id, bookingData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id)
  return result
}

export const bookingServices = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getAllBookingsOfUser,
  updateBooking,
  deleteBooking,
}
