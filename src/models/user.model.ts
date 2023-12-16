import { Query, Schema, model } from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: [true, 'please tell us your name'],
  },
  age: { type: Number, required: [true, 'please tell us your'] },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'please tell us your email'],
  },
  photo: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  userStatus: { type: String, enum: ['active', 'inactive'], default: 'active' },
})

userSchema.pre(/^find/, function (this: Query<IUser, Document>, next) {
  this.find({ userStatus: { $eq: 'active' } })
  next()
})
// userSchema.pre('findOne', function (next) {
//   this.findOne({ userStatus: { $eq: 'active' } })
//   next()
// })

const User = model<IUser>('User', userSchema)

export default User
