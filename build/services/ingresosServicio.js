"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIdEntry = exports.deleteIdEntry = exports.getIdEntry = exports.addEntry = exports.getAllEntries = void 0;
const conexion_1 = require("../conexion");
const utils_1 = require("../utils");
async function getAllEntries(_req, res) {
    try {
        const conn = await (0, conexion_1.connect)();
        const getAll = await conn.query('SELECT * FROM Ingresos WHERE TipoIngreso = ?', 'planes');
        return res.json(getAll[0]);
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.getAllEntries = getAllEntries;
async function addEntry(req, res) {
    try {
        const newEntry = (0, utils_1.addIngresoEntry)(req.body);
        const conn = await (0, conexion_1.connect)();
        const UsuarioIdExist = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [newEntry.UsuarioId]);
        const ClienteIdExist = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [newEntry.ClienteId]);
        if (UsuarioIdExist[0].length === 0 && ClienteIdExist[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        else {
            await conn.query('INSERT INTO Ingresos SET ?', [newEntry]);
            return res.json({
                message: 'Entrada de Ingreso añadida'
            });
        }
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.addEntry = addEntry;
async function getIdEntry(req, res) {
    try {
        const { id } = req.params;
        const conn = await (0, conexion_1.connect)();
        const getId = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [id]);
        if (getId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        else {
            return res.json(getId[0]);
        }
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.getIdEntry = getIdEntry;
async function deleteIdEntry(req, res) {
    try {
        const { id } = req.params;
        const conn = await (0, conexion_1.connect)();
        const deleteId = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [id]);
        if (deleteId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        else {
            await conn.query('DELETE FROM Ingresos WHERE IngresoId = ?', [id]);
            return res.json({
                message: 'Entrada de Ingreso eliminada'
            });
        }
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.deleteIdEntry = deleteIdEntry;
async function updateIdEntry(req, res) {
    try {
        const { id } = req.params;
        const updateEntry = req.body;
        const conn = await (0, conexion_1.connect)();
        const UsuarioIdExist = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [updateEntry.UsuarioId]);
        const ClienteIdExist = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [updateEntry.ClienteId]);
        if (UsuarioIdExist[0].length === 0 && ClienteIdExist[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        else {
            const updateId = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [id]);
            await conn.query('UPDATE Ingresos set ? WHERE IngresoId = ?', [updateEntry, id]);
            if (updateId[0].length === 0) {
                return res.status(404).json({ message: 'El registro con el id especificado no existe' });
            }
            else {
                return res.json({
                    message: 'Entrada de Clase actualizada'
                });
            }
        }
    }
    catch (e) {
        let message;
        if (e instanceof Error)
            message = e.message;
        else
            message = String(e);
        return res.status(400).send(message);
    }
}
exports.updateIdEntry = updateIdEntry;
