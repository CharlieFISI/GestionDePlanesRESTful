import { Router } from 'express'
import { App } from './app'

const router = Router()
const port = 3031

router.get('/', (_req, res) => res.json('Bienvenido a mi API'))

router.get('/ping', (_req, res) => {
  console.log('Alguien ha hecho ping ' + new Date().toLocaleDateString())
  res.send('pong')
})

export default router

async function main (): Promise<void> {
  const app = new App(port)
  await app.listen()
}

void main()
