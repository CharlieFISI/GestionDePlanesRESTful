import { PlanEntry, PlanEntryWithoutId } from '../types'
import { Request, Response } from 'express'
import { connect } from '../conexion'
import { addPlanEntry } from '../utils'
import { RowDataPacket } from 'mysql2/promise'

export async function getAllEntries (_req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect()
    const getAll = await conn.query('SELECT * FROM Planes')
    return res.json(getAll[0])
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

export async function addEntry (req: Request, res: Response): Promise<Response> {
  try {
    const newEntry: PlanEntryWithoutId = addPlanEntry(req.body)
    const conn = await connect()
    await conn.query('INSERT INTO Planes SET ?', [newEntry])
    return res.json({
      message: 'Entrada de Plan añadida'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

export async function getIdEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const conn = await connect()
    const getId = await conn.query('SELECT * FROM Planes WHERE PlanId = ?', [id]) as RowDataPacket[]
    if (getId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    } else {
      return res.json(getId[0])
    }
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

export async function deleteIdEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const conn = await connect()
    const deleteId = await conn.query('SELECT * FROM Planes WHERE PlanId = ?', [id]) as RowDataPacket[]
    await conn.query('DELETE FROM Planes WHERE PlanId = ?', [id])
    if (deleteId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    } else {
      return res.json({
        message: 'Entrada de Plan eliminada'
      })
    }
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}

export async function updateIdEntry (req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const updateEntry: PlanEntry = req.body
    const conn = await connect()
    const updateId = await conn.query('SELECT * FROM Planes WHERE PlanId = ?', [id]) as RowDataPacket[]
    await conn.query('UPDATE Planes set ? WHERE PlanId = ?', [updateEntry, id])
    if (updateId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    } else {
      return res.json({
        message: 'Entrada de Plan actualizada'
      })
    }
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}
