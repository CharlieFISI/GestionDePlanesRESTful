import express, { Application } from 'express'
import cors from 'cors'
import indexRouter from './index'
import ingresoRouter from './routes/ingresos'
import planRouter from './routes/planes'
import planingresoRouter from './routes/planesingresos'

const allowedOrigins = ['192.168.0.123:3000', 'https://titaniumgym.azurewebsites.net']
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
    this.app.use('/rs-ne-gestion-de-planes/servicio-de-ingresos/v1/ingresos', ingresoRouter)
    this.app.use('/rs-ne-gestion-de-planes/servicio-de-planes/v1/planes', planRouter)
    this.app.use('/rs-ne-gestion-de-planes/servicio-de-ingreso-de-planes/v1/planesingresos', planingresoRouter)
  }

  async listen (): Promise<void> {
    await this.app.listen(this.port)
    console.log(`┬íServidor conectado al puerto ${this.port}!`)
  }
}
