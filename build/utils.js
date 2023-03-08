"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIngresoInfoEntry = exports.addPlanesIngresoEntry = exports.addIngresoEntry = exports.addPlanEntry = void 0;
const enums_1 = require("./enums");
const parseNombre = (stringFromRequest) => {
    if (!isString(stringFromRequest)) {
        throw new Error('Nombre inexistente o incorrecto');
    }
    return stringFromRequest;
};
const parsePrecio = (numberFromRequest) => {
    if (!isNumber(numberFromRequest)) {
        throw new Error('Precio inexistente o incorrecta');
    }
    return numberFromRequest;
};
const parseDuracion = (numberFromRequest) => {
    if (!isInt(numberFromRequest)) {
        throw new Error('Duracion inexistente o incorrecta');
    }
    return numberFromRequest;
};
const parseIngresoId = (numberFromRequest) => {
    if (!isInt(numberFromRequest)) {
        throw new Error('IngresoId inexistente o incorrecta');
    }
    return numberFromRequest;
};
const parseTipoIngreso = (weatherFromRequest) => {
    if (!isString(weatherFromRequest) || !isTipoIngreso(weatherFromRequest)) {
        throw new Error('Tipo de ingreso inexistente o incorrecto');
    }
    return weatherFromRequest;
};
const parseUsuarioId = (numberFromRequest) => {
    if (!isInt(numberFromRequest)) {
        throw new Error('UsuarioId inexistente o incorrecta');
    }
    return numberFromRequest;
};
const parseClienteId = (numberFromRequest) => {
    if (!isInt(numberFromRequest)) {
        throw new Error('ClienteId inexistente o incorrecta');
    }
    return numberFromRequest;
};
const parseMontoTotal = (numberFromRequest) => {
    if (!isNumber(numberFromRequest)) {
        throw new Error('Monto total inexistente o incorrecta');
    }
    return numberFromRequest;
};
const parseFecha = (dateFromRequest) => {
    if (!isDate(dateFromRequest)) {
        throw new Error('Fecha inexistente o incorrecta');
    }
    return dateFromRequest;
};
const parsePlanId = (numberFromRequest) => {
    if (!isInt(numberFromRequest)) {
        throw new Error('ClaseId inexistente o incorrecta');
    }
    return numberFromRequest;
};
const isString = (string) => {
    return typeof string === 'string';
};
const isNumber = (precio) => {
    return (typeof precio === 'number' && !isNaN(precio));
};
const isInt = (int) => {
    return ((typeof int === 'number' && !isNaN(int)) && Number.isInteger(int));
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isTipoIngreso = (param) => {
    return Object.values(enums_1.TipoIngreso).includes(param);
};
const addPlanEntry = (object) => {
    const newEntry = {
        Nombre: parseNombre(object.Nombre),
        Precio: parsePrecio(object.Precio),
        Duracion: parseDuracion(object.Duracion)
    };
    return newEntry;
};
exports.addPlanEntry = addPlanEntry;
const addIngresoEntry = (object) => {
    const newEntry = {
        TipoIngreso: parseTipoIngreso('planes'),
        UsuarioId: parseUsuarioId(object.UsuarioId),
        ClienteId: parseClienteId(object.ClienteId),
        MontoTotal: parseMontoTotal(object.MontoTotal),
        Fecha: parseFecha(object.Fecha)
    };
    return newEntry;
};
exports.addIngresoEntry = addIngresoEntry;
const addPlanesIngresoEntry = (object) => {
    const newEntry = {
        PlanId: parsePlanId(object.PlanId),
        IngresoId: parseIngresoId(object.IngresoId),
        FechaInicio: parseFecha(object.FechaInicio)
    };
    return newEntry;
};
exports.addPlanesIngresoEntry = addPlanesIngresoEntry;
const addIngresoInfoEntry = (object) => {
    const newEntry = {
        TipoIngreso: parseTipoIngreso('planes'),
        UsuarioId: parseUsuarioId(object.UsuarioId),
        ClienteId: parseClienteId(object.ClienteId),
        MontoTotal: parseMontoTotal(object.MontoTotal),
        PlanId: parsePlanId(object.PlanId),
        FechaInicio: parseFecha(object.FechaInicio)
    };
    return newEntry;
};
exports.addIngresoInfoEntry = addIngresoInfoEntry;
