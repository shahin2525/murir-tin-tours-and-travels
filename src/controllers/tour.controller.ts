/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { tourServices } from '../services/tour.service'
import catchAsync from '../utils/catchAsync'
import sendResponse from '../utils/sendResponse'

const createTour = catchAsync(async (req: Request, res: Response) => {
  const tourData = req.body

  const result = await tourServices.createTour(tourData)
  sendResponse(res, {
    statusCode: 201,
    message: 'create tour  successfully',
    data: result,
  })
})

const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const result = await tourServices.getAllTours()

  sendResponse(res, {
    statusCode: 201,
    message: 'allTour fetch successfully',
    data: result,
  })
})

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await tourServices.getSingleTour(id)

  sendResponse(res, {
    statusCode: 201,
    message: 'single tour fetch successfully',
    data: result,
  })
})
const updateTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const tourData = req.body
  const result = await tourServices.updateTour(id, tourData)

  sendResponse(res, {
    statusCode: 201,
    message: 'update Tour successfully',
    data: result,
  })
})
const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  await tourServices.deleteTour(id)

  sendResponse(res, {
    statusCode: 201,
    message: 'tour deleted successfully',
    data: null,
  })
})
const getNextSchedule = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await tourServices.getNextSchedule(id)

  sendResponse(res, {
    statusCode: 201,
    message: 'next schedule fetch successfully',
    data: result,
  })
})

export const tourController = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
