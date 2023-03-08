import { TipoIngreso } from './enums'

export interface PlanEntry {
  PlanId: number
  Nombre: string
  Precio: number
  Duracion: number
}

export interface IngresoEntry {
  IngresoId: number
  TipoIngreso: TipoIngreso
  UsuarioId: number
  ClienteId: number
  MontoTotal: number
  Fecha: Date
}

export interface PlanesIngresoEntry {
  PlanesIngresoId: number
  PlanId: number
  IngresoId: number
  FechaInicio: Date
}

export interface IngresoInfoEntry {
  IngresoId: number
  TipoIngreso: TipoIngreso
  UsuarioId: number
  ClienteId: number
  MontoTotal: number
  PlanesIngresoId: number
  PlanId: number
  FechaInicio: Date
}

export type PlanEntryWithoutId = Omit<PlanEntry, 'PlanId'>
export type IngresoEntryWithoutId = Omit<IngresoEntry, 'IngresoId'>
export type PlanesIngresoEntryWithoutId = Omit<PlanesIngresoEntry, 'PlanesIngresoId'>
export type IngresoInfoEntryWithoutId = Omit<IngresoInfoEntry, 'PlanesIngresoId', 'IngresoId'>
