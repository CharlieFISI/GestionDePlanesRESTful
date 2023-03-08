import express, { Application } from 'express'
import cors from 'cors'
import indexRouter from './index'
import ingresoRouter from './routes/ingresos'
import planRouter from './routes/planes'
import planingresoRouter from './routes/planesingresos'

const allowedOrigins = ['http://localhost:3000']
const options: cors.CorsOptions = {
  origin: allowedOrigins
}

export class App {
  private readonly app: Application

  constructor (private readonly port: number | string) {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  settings (): void {
    this.app.set('port', this.port)
  }

  middlewares (): void {
    this.app.use(express.json())
    this.app.use(cors(options))
  }

  routes (): void {
    this.app.use(indexRouter)
    this.app.use('/api/ingresos', ingresoRouter)
    this.app.use('/api/planes', planRouter)
    this.app.use('/api/planesingresos', planingresoRouter)
  }

  async listen (): Promise<void> {
    await this.app.listen(this.port)
    console.log(`¡Servidor conectado al puerto ${this.port}!`)
  }
}
