import { TipoIngreso } from './enums'
import { PlanEntryWithoutId, IngresoEntryWithoutId, PlanesIngresoEntryWithoutId, IngresoInfoEntryWithoutId } from './types'

const parseNombre = (stringFromRequest: any): string => {
  if (!isString(stringFromRequest)) {
    throw new Error('Nombre inexistente o incorrecto')
  }
  return stringFromRequest
}

const parsePrecio = (numberFromRequest: any): number => {
  if (!isNumber(numberFromRequest)) {
    throw new Error('Precio inexistente o incorrecta')
  }
  return numberFromRequest
}

const parseDuracion = (numberFromRequest: any): number => {
  if (!isInt(numberFromRequest)) {
    throw new Error('Duracion inexistente o incorrecta')
  }
  return numberFromRequest
}

const parseIngresoId = (numberFromRequest: any): number => {
  if (!isInt(numberFromRequest)) {
    throw new Error('IngresoId inexistente o incorrecta')
  }
  return numberFromRequest
}

const parseTipoIngreso = (weatherFromRequest: any): TipoIngreso => {
  if (!isString(weatherFromRequest) || !isTipoIngreso(weatherFromRequest)) {
    throw new Error('Tipo de ingreso inexistente o incorrecto')
  }
  return weatherFromRequest
}

const parseUsuarioId = (numberFromRequest: any): number => {
  if (!isInt(numberFromRequest)) {
    throw new Error('UsuarioId inexistente o incorrecta')
  }
  return numberFromRequest
}

const parseClienteId = (numberFromRequest: any): number => {
  if (!isInt(numberFromRequest)) {
    throw new Error('ClienteId inexistente o incorrecta')
  }
  return numberFromRequest
}

const parseMontoTotal = (numberFromRequest: any): number => {
  if (!isNumber(numberFromRequest)) {
    throw new Error('Monto total inexistente o incorrecta')
  }
  return numberFromRequest
}

const parseFecha = (dateFromRequest: any): Date => {
  if (!isDate(dateFromRequest)) {
    throw new Error('Fecha inexistente o incorrecta')
  }
  return dateFromRequest
}

const parsePlanId = (numberFromRequest: any): number => {
  if (!isInt(numberFromRequest)) {
    throw new Error('ClaseId inexistente o incorrecta')
  }
  return numberFromRequest
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isNumber = (precio: number): boolean => {
  return (typeof precio === 'number' && !isNaN(precio))
}

const isInt = (int: number): boolean => {
  return ((typeof int === 'number' && !isNaN(int)) && Number.isInteger(int))
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isTipoIngreso = (param: any): boolean => {
  return Object.values(TipoIngreso).includes(param)
}

export const addPlanEntry = (object: any): PlanEntryWithoutId => {
  const newEntry: PlanEntryWithoutId = {
    Nombre: parseNombre(object.Nombre),
    Precio: parsePrecio(object.Precio),
    Duracion: parseDuracion(object.Duracion)
  }
  return newEntry
}

export const addIngresoEntry = (object: any): IngresoEntryWithoutId => {
  const newEntry: IngresoEntryWithoutId = {
    TipoIngreso: parseTipoIngreso('planes'),
    UsuarioId: parseUsuarioId(object.UsuarioId),
    ClienteId: parseClienteId(object.ClienteId),
    MontoTotal: parseMontoTotal(object.MontoTotal),
    Fecha: parseFecha(object.Fecha)
  }
  return newEntry
}

export const addPlanesIngresoEntry = (object: any): PlanesIngresoEntryWithoutId => {
  const newEntry: PlanesIngresoEntryWithoutId = {
    PlanId: parsePlanId(object.PlanId),
    IngresoId: parseIngresoId(object.IngresoId),
    FechaInicio: parseFecha(object.FechaInicio)
  }
  return newEntry
}

export const addIngresoInfoEntry = (object: any): IngresoInfoEntryWithoutId => {
  const newEntry: IngresoInfoEntryWithoutId = {
    TipoIngreso: parseTipoIngreso('planes'),
    UsuarioId: parseUsuarioId(object.UsuarioId),
    ClienteId: parseClienteId(object.ClienteId),
    MontoTotal: parseMontoTotal(object.MontoTotal),
    PlanId: parsePlanId(object.PlanId),
    FechaInicio: parseFecha(object.FechaInicio)
  }
  return newEntry
}
