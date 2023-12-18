/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

import { userServices } from '../services/user.service'
import sendResponse from '../utils/sendResponse'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body

    const result = await userServices.createUser(userData)
    sendResponse(res, {
      statusCode: 201,
      message: 'user create successfully ',
      data: result,
    })
  } catch (err: any) {
    next(err)
  }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.getAllUsers()

    sendResponse(res, {
      statusCode: 201,
      message: 'Get all users successfully',
      data: result,
    })
  } catch (err: any) {
    next(err)
  }
}

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await userServices.getSingleUser(id)
    sendResponse(res, {
      statusCode: 201,
      message: 'Get single user successfully',
      data: result,
    })
  } catch (error: any) {
    next(error)
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const userData = req.body
    const result = await userServices.updateUser(id, userData)
    sendResponse(res, {
      statusCode: 201,
      message: 'update user successfully',
      data: result,
    })
  } catch (error: any) {
    next(error)
  }
}
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    await userServices.deleteUser(id)
    sendResponse(res, {
      statusCode: 201,
      message: 'delete user successfully',
      data: null,
    })
  } catch (error: any) {
    next(error)
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
