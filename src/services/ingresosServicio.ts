import { IngresoEntry, IngresoEntryWithoutId } from '../types'
import { Request, Response } from 'express'
import { connect } from '../conexion'
import { addIngresoEntry } from '../utils'
import { RowDataPacket } from 'mysql2/promise'

export async function getAllEntries (_req: Request, res: Response): Promise<Response> {
  try {
    const conn = await connect()
    const getAll = await conn.query('SELECT * FROM Ingresos WHERE TipoIngreso = ?', 'planes')
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
    const newEntry: IngresoEntryWithoutId = addIngresoEntry(req.body)
    const conn = await connect()
    const UsuarioIdExist = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [newEntry.UsuarioId]) as RowDataPacket[]
    const ClienteIdExist = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [newEntry.ClienteId]) as RowDataPacket[]
    if (UsuarioIdExist[0].length === 0 && ClienteIdExist[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    } else {
      await conn.query('INSERT INTO Ingresos SET ?', [newEntry])
      return res.json({
        message: 'Entrada de Ingreso añadida'
      })
    }
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
    const getId = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [id]) as RowDataPacket[]
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
    const deleteId = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [id]) as RowDataPacket[]
    if (deleteId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado no existe' })
    } else {
      await conn.query('DELETE FROM Ingresos WHERE IngresoId = ?', [id])
      return res.json({
        message: 'Entrada de Ingreso eliminada'
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
    const updateEntry: IngresoEntry = req.body
    const conn = await connect()
    const updateId = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [id]) as RowDataPacket[]
    if (updateId[0].length === 0) {
      return res.status(404).json({ message: 'El registro con el id especificado en la ruta no existe' })
    }
    if (!isNaN(updateEntry.UsuarioId) && isNaN(updateEntry.ClienteId)) {
      const UsuarioIdExist = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [updateEntry.UsuarioId]) as RowDataPacket[]
      if (UsuarioIdExist[0].length === 0) {
        return res.status(404).json({
          message: 'El registro con el UsuarioId especificado no existe'
        })
      }
    }
    if (isNaN(updateEntry.UsuarioId) && !isNaN(updateEntry.ClienteId)) {
      const ClienteIdExist = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [updateEntry.ClienteId]) as RowDataPacket[]
      if (ClienteIdExist[0].length === 0) {
        return res.status(404).json({
          message: 'El registro con el ClienteId especificado no existe'
        })
      }
    }
    await conn.query('UPDATE Ingresos set ? WHERE IngresoId = ?', [updateEntry, id])
    return res.json({
      message: 'Entrada de Ingreso actualizada'
    })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    return res.status(400).send(message)
  }
}
