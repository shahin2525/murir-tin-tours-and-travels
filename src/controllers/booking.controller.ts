/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { bookingServices } from '../services/booking.service'
import catchAsync from '../utils/catchAsync'
import sendResponse from '../utils/sendResponse'

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body

  const result = await bookingServices.createBooking(bookingData)
  sendResponse(res, {
    statusCode: 201,
    message: 'create booking  successfully',
    data: result,
  })
})

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingServices.getAllBookings()

  sendResponse(res, {
    statusCode: 201,
    message: 'allBooking fetch successfully',
    data: result,
  })
})
const getAllBookingsOfUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId
  const result = await bookingServices.getAllBookingsOfUser(userId)

  sendResponse(res, {
    statusCode: 201,
    message: 'allBooking bookings of a user fetch successfully',
    data: result,
  })
})

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await bookingServices.getSingleBooking(id)

  sendResponse(res, {
    statusCode: 201,
    message: 'single booking fetch successfully',
    data: result,
  })
})
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const bookingData = req.body
  const result = await bookingServices.updateBooking(id, bookingData)

  sendResponse(res, {
    statusCode: 201,
    message: 'update Booking successfully',
    data: result,
  })
})
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  await bookingServices.deleteBooking(id)

  sendResponse(res, {
    statusCode: 201,
    message: 'booking deleted successfully',
    data: null,
  })
})

export const bookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getAllBookingsOfUser,
  updateBooking,
  deleteBooking,
}
