/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import handleValidationError from './handleValidationError'
import handleDuplicateError from './handleDuplicateError'
import handleCastError from './handleCastError'
import GenericError from '../../classess/errorClasses/GenericError'
import handleGenericError from './handleGenericError'
import { TErrorResponse } from '../../interfaces/TErrorResponse'
import { ZodError } from 'zod'
import handleZodError from './handleZodError'

const errorPreprocessor = (err: any): TErrorResponse => {
  if (err instanceof ZodError) {
    return handleZodError(err)
  } else if (err instanceof mongoose.Error.ValidationError) {
    // ;(errorResponse.statusCode = 400),
    //   (errorResponse.message = 'validation error'),
    //   (errorResponse.status = 'error')

    // const errorValues = Object.values(err.errors)

    // errorValues.forEach(
    //   (errorObj: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    //     errorResponse.issues.push({
    //       path: errorObj.path,
    //       message: errorObj.message,
    //     })
    //   },
    // )

    return handleValidationError(err)
  } else if (err.code && err.code === 11000) {
    // const regex = /"([^"]+)"/
    // const match = err.message.match(regex)
    // if (match) {
    //   const extractedText: string = match[1]
    //   errorResponse.statusCode = 409
    //   errorResponse.status = 'fail'
    //   errorResponse.message = 'duplicate error'
    //   errorResponse.issues = [
    //     {
    //       path: '',
    //       message: `duplicate value for ${extractedText}`,
    //     },
    //   ]
    // }
    return handleDuplicateError(err)
  } else if (err instanceof mongoose.Error.CastError) {
    // errorResponse.statusCode = 400
    // errorResponse.status = 'error'
    // errorResponse.message = 'invalid Id'
    // errorResponse.issues = [
    //   {
    //     path: err.path,
    //     message: err.message,
    //   },
    // ]
    return handleCastError(err)
  } else if (err instanceof GenericError) {
    return handleGenericError(err)
  } else {
    return {
      statusCode: 500,
      status: 'error',
      message: 'unknown error',
      issues: [
        {
          path: '',
          message: err.message,
        },
      ],
    }
  }
}

export default errorPreprocessor
