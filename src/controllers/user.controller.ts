/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

import { userServices } from '../services/user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    // const result = await User.create(userData)
    const result = await userServices.createUser(userData)
    res.status(201).json({
      status: 'success',
      message: 'user created successfully',
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

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers()
    res.status(200).json({
      status: 'success',
      message: 'allUser fetch successfully',
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await userServices.getSingleUser(id)
    res.status(200).json({
      status: 'success',
      message: 'single user fetch successfully',
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const userData = req.body
    const result = await userServices.updateUser(id, userData)
    res.status(200).json({
      status: 'success',
      message: 'updateUser successfully',
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
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await userServices.deleteUser(id)
    res.status(200).json({
      status: 'success',
      message: 'user deleted successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      status: 'fail',
      message: error.message || 'something went wrong',
    })
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
