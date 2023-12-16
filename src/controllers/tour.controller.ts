/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { tourServices } from '../services/tour.service'

const createTour = async (req: Request, res: Response) => {
  try {
    const tourData = req.body
    // const result = await Tour.create(tourData)
    const result = await tourServices.createTour(tourData)
    res.status(201).json({
      status: 'success',
      message: 'tour created successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: err.message || 'something went wrong',
    })
  }
}

const getAllTours = async (req: Request, res: Response) => {
  try {
    const result = await tourServices.getAllTours()
    res.status(200).json({
      status: 'success',
      message: 'allTour fetch successfully',
      data: result,
    })
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err: any
  ) {
    res.status(500).json({
      status: 'fail',
      message: err.message || 'something went wrong',
    })
  }
}

const getSingleTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourServices.getSingleTour(id)
    res.status(200).json({
      status: 'success',
      message: 'single tour fetch successfully',
      data: result,
    })
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

const updateTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const tourData = req.body
    const result = await tourServices.updateTour(id, tourData)
    res.status(200).json({
      status: 'success',
      message: 'updateTour successfully',
      data: result,
    })
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}
const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await tourServices.deleteTour(id)
    res.status(200).json({
      status: 'success',
      message: 'tour deleted successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}
const getNextSchedule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourServices.getNextSchedule(id)
    res.status(200).json({
      status: 'success',
      message: 'next schedule fetch successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

export const tourController = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
