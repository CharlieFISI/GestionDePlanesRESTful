/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getAllEntries, addEntry, getIdEntry, deleteIdEntry, updateIdEntry, addInfoIngresoEntry, getInfoIngreso } from '../services/ingresosServicio'

const router = express.Router()

router.route('/')
  .get(getAllEntries)
  .post(addEntry)

router.route('/plan')
  .get(getInfoIngreso)
  .post(addInfoIngresoEntry)

router.route('/:id')
  .get(getIdEntry)
  .delete(deleteIdEntry)
  .put(updateIdEntry)

export default router
