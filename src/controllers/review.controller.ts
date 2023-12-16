/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { reviewServices } from '../services/review.service'

const createReview = async (req: Request, res: Response) => {
  try {
    const reviewData = req.body
    // const result = await Review.create(reviewData)
    const result = await reviewServices.createReview(reviewData)
    res.status(201).json({
      status: 'success',
      message: 'review created successfully',
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

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await reviewServices.getAllReviews()
    res.status(200).json({
      status: 'success',
      message: 'allReview fetch successfully',
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

const getSingleReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await reviewServices.getSingleReview(id)
    res.status(200).json({
      status: 'success',
      message: 'single review fetch successfully',
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

const updateReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const reviewData = req.body
    const result = await reviewServices.updateReview(id, reviewData)
    res.status(200).json({
      status: 'success',
      message: 'updateReview successfully',
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
const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await reviewServices.deleteReview(id)
    res.status(200).json({
      status: 'success',
      message: 'review deleted successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

export const reviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
