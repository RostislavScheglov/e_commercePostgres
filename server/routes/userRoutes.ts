import express from 'express'
import { creatNewUser, updateUser } from '../controllers/userController'

const userRouter = express.Router()

userRouter.post('/registration', creatNewUser)
userRouter.patch('/updateInfo/:id', updateUser)

export default userRouter
