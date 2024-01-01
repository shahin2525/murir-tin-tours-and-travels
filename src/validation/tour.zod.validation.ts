import { z } from 'zod'

export const tourZodValidationSchema = z
  .object({
    // todo wil fix for name and duration hours
    // name: z
    //   .string()
    //   .min(1)
    //   .refine(
    //     (data) => {
    //       if (data.length > 5) {
    //         return false
    //       }
    //     },
    //     {
    //       message: 'name must be greater than five character',
    //     },
    //   ),

    // durationHours: z
    //   .number()
    //   .min(1)
    //   .int()
    //   .positive()
    //   .refine(
    //     (data) => {
    //       if (data > 5) {
    //         return false
    //       }
    //     },
    //     {
    //       message: 'durationHours must be greater than 5',
    //     },
    //   ),
    name: z.string().refine(
      (data) => {
        if (data.length < 5) {
          return false
        }
      },
      {
        message: 'Name must be less than 5 characters',
      },
    ),
    durationHours: z
      .number()
      .int()
      .positive()
      .min(1)
      .refine(
        (data) => {
          if (data < 5) {
            return false
          }
        },
        {
          message: 'Duration must be greater than 5 hours',
        },
      ),
    ratingAverage: z.number().min(1).positive().max(5),
    ratingQuality: z.number().min(1).int().positive(),
    price: z.number().min(1).int().positive(),
    discountPrice: z.number().int().min(1).positive().optional(),
  })
  .refine(
    (data) => {
      if (data.discountPrice === undefined) return true
      if (data.discountPrice > data.price) return false
    },
    {
      message: 'discountPrice must be less than price',
    },
  )
