import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes'

const port = 4000
const app: Express = express()
app.use(cors())
app.use(express.json({ limit: '5mb', type: 'application/json' }))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Berver')
})
app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
