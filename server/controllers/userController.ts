import { Request, Response } from 'express'
import pool from '../database/postgresConfig'
import { DatabaseError } from 'pg'
import bcrypt from 'bcrypt'
export const creatNewUser = async (req: Request, res: Response) => {
  try {
    const { nickName, email, passw, isAdmin } = req.body
    const passwrCrypt = await bcrypt.hash(passw, await bcrypt.genSalt(10))
    const newUser = await pool.query(
      'INSERT INTO usertable (nickName, email, passw, isAdmin) values ($1, $2, $3, $4) RETURNING *',
      [nickName, email, passwrCrypt, isAdmin]
    )
    res.status(200).json('ok')
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.code === '23505')
        return res
          .status(500)
          .json({ msg: 'This email or username are already existed' })
    }
    res.status(500).json([
      {
        msg: 'Registration faild',
      },
    ])
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const { nickname, email, passw, isAdmin } = req.body
    console.log(nickname, email, passw, isAdmin)
    const passwrCrypt = await bcrypt.hash(passw, await bcrypt.genSalt(10))
    const updatedUser = await pool.query(
      'UPDATE usertable SET nickname = $1, email = $2, passw = $3, isAdmin = $4 WHERE user_idd = $5 RETURNING *',
      [nickname, email, passwrCrypt, isAdmin, id]
    )

    res.status(200).json('ok')
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.code === '23505')
        return res
          .status(500)
          .json({ msg: 'This email or username are already existed' })
    }
    res.status(500).json([
      {
        msg: 'User info update failed',
      },
    ])
  }
}
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { nickName, email, passw, isAdmin } = req.body
    const newUser = await pool.query(
      'INSERT INTO usertable (nickName, email, passw, isAdmin) values ($1, $2, $3, $4) RETURNING *',
      [nickName, email, passw, isAdmin]
    )
    res.status(200).json('ok')
  } catch (err) {
    if (err instanceof DatabaseError) {
      if (err.code === '23505')
        return res
          .status(500)
          .json({ msg: 'This email or username are already existed' })
    }
    res.status(500).json([
      {
        msg: 'Registration faild',
      },
    ])
  }
}
