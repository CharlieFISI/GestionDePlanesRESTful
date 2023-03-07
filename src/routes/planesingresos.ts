/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { getAllEntries, addEntry, getIdEntry, deleteIdEntry, updateIdEntry } from '../services/planesingresosServicio'

const router = express.Router()

router.route('/')
  .get(getAllEntries)
  .post(addEntry)

router.route('/:id')
  .get(getIdEntry)
  .delete(deleteIdEntry)
  .put(updateIdEntry)

export default router
