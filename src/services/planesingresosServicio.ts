import { PlanesIngresoEntry, PlanesIngresoEntryWithoutId } from '../types'
import { Request, Response } from 'express'
import { connect } from '../conexion'
import { addPlanesIngresoEntry } from '../utils'
import { RowDataPacket } from 'mysql2/promise'

export async function getAllEntries (_req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect()
    const getAll = await conn.query('SELECT * FROM PlanesIngresos')
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
    const newEntry: PlanesIngresoEntryWithoutId = addPlanesIngresoEntry(req.body)
    const conn = await connect()
    const IngresoIdUnique = await conn.query('SELECT * FROM PlanesIngresos WHERE IngresoId = ?', [newEntry.IngresoId]) as RowDataPacket[]
    const IngresoIdExist = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [newEntry.IngresoId]) as RowDataPacket[]
    const [IngresoIsPlan] = await conn.query('SELECT TipoIngreso FROM Ingresos WHERE IngresoId = ?', [newEntry.IngresoId]) as RowDataPacket[]
    if (IngresoIsPlan[0].TipoIngreso !== 'planes') {
      return res.status(404).json({ message: 'El registro con el IngresoId especificado no es un ingreso para Planes' })
    }
    if (IngresoIdExist[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    if (IngresoIdUnique[0].length !== 0) {
      return res.status(404).json({ message: 'Existe un registro con el mismo IngresoId' })
    }
    await conn.query('INSERT INTO PlanesIngresos SET ?', [newEntry])
    return res.json({
      message: 'Entrada de Ingreso de plan añadida'
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
    const getId = await conn.query('SELECT * FROM PlanesIngresos WHERE PlanesIngresoId = ?', [id]) as RowDataPacket[]
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
    const deleteId = await conn.query('SELECT * FROM PlanesIngresos WHERE PlanesIngresoId = ?', [id]) as RowDataPacket[]
    await conn.query('DELETE FROM PlanesIngresos WHERE PlanesIngresoId = ?', [id])
    if (deleteId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    } else {
      return res.json({
        message: 'Entrada de Ingreso de plan eliminada'
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
    const updateEntry: PlanesIngresoEntry = req.body
    const conn = await connect()
    const updateId = await conn.query('SELECT * FROM PlanesIngresos WHERE PlanesIngresoId = ?', [id]) as RowDataPacket[]
    if (updateId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    }
    if (!isNaN(updateEntry.IngresoId)) {
      const IngresoIdExist = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [updateEntry.IngresoId]) as RowDataPacket[]
      if (IngresoIdExist[0].length === 0) {
        return res.status(404).json({
          message: 'El registro con el UsuarioId especificado no existe'
        })
      }
      const [IngresoIdUnique] = await conn.query('SELECT PlanesIngresoId FROM PlanesIngresos WHERE IngresoId = ?', [updateEntry.IngresoId]) as RowDataPacket[]
      if (IngresoIdUnique.length !== 0 && IngresoIdUnique.PlanesIngresoId !== updateEntry.PlanesIngresoId) {
        return res.status(404).json({
          message: 'Existe un registro con el mismo IngresoId'
        })
      }
    }
    await conn.query('UPDATE PlanesIngresos set ? WHERE PlanesIngresoId = ?', [updateEntry, id])
    return res.json({
      message: 'Entrada de Clase actualizada'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}
