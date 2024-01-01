/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from 'mongoose'
import { IBooking } from '../interfaces/booking.interface'
import Booking from '../models/booking.model'
import Tour from '../models/tour.model'
import GenericError from '../classess/errorClasses/GenericError'

const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
  // create transaction
  const session = await startSession()

  // start transaction
  session.startTransaction()
  try {
    const booking = await Booking.create([bookingData], { session })

    if (!booking) {
      throw new GenericError('booking failed to create ', 400)
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
      throw new GenericError('Tour update in booking failed', 400)
    }

    await session.commitTransaction()
    await session.endSession()

    return booking[0]
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new GenericError(error.message, 400)
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
