import express, { Application } from 'express'

import indexRouter from './index'
import ingresoRouter from './routes/ingresos'
import planRouter from './routes/planes'
import planingresoRouter from './routes/planesingresos'

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
  }

  routes (): void {
    this.app.use(indexRouter)
    this.app.use('/api/ingresos', ingresoRouter)
    this.app.use('/api/planes', planRouter)
    this.app.use('/api/planingresos', planingresoRouter)
  }

  async listen (): Promise<void> {
    await this.app.listen(this.port)
    console.log(`¡Servidor conectado al puerto ${this.port}!`)
  }
}
