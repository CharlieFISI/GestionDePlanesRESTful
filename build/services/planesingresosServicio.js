"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIdEntry = exports.deleteIdEntry = exports.getIdEntry = exports.addEntry = exports.getAllEntries = void 0;
const conexion_1 = require("../conexion");
const utils_1 = require("../utils");
async function getAllEntries(_req, res) {
    try {
        const conn = await (0, conexion_1.connect)();
        const getAll = await conn.query('SELECT * FROM PlanesIngresos');
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
        const newEntry = (0, utils_1.addPlanesIngresoEntry)(req.body);
        const conn = await (0, conexion_1.connect)();
        const IngresoIdUnique = await conn.query('SELECT * FROM PlanesIngresos WHERE IngresoId = ?', [newEntry.IngresoId]);
        const IngresoIdExist = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [newEntry.IngresoId]);
        const [IngresoIsPlan] = await conn.query('SELECT TipoIngreso FROM Ingresos WHERE IngresoId = ?', [newEntry.IngresoId]);
        if (IngresoIsPlan[0].TipoIngreso !== 'planes') {
            return res.status(404).json({ message: 'El registro con el IngresoId especificado no es un ingreso para Planes' });
        }
        if (IngresoIdExist[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        if (IngresoIdUnique[0].length !== 0) {
            return res.status(404).json({ message: 'Existe un registro con el mismo IngresoId' });
        }
        await conn.query('INSERT INTO PlanesIngresos SET ?', [newEntry]);
        return res.json({
            message: 'Entrada de Ingreso de plan añadida'
        });
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
        const getId = await conn.query('SELECT * FROM PlanesIngresos WHERE PlanesIngresoId = ?', [id]);
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
        const deleteId = await conn.query('SELECT * FROM PlanesIngresos WHERE PlanesIngresoId = ?', [id]);
        await conn.query('DELETE FROM PlanesIngresos WHERE PlanesIngresoId = ?', [id]);
        if (deleteId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        else {
            return res.json({
                message: 'Entrada de Ingreso de plan eliminada'
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
        const updateId = await conn.query('SELECT * FROM PlanesIngresos WHERE PlanesIngresoId = ?', [id]);
        if (updateId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        if (!isNaN(updateEntry.IngresoId)) {
            const IngresoIdExist = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [updateEntry.IngresoId]);
            if (IngresoIdExist[0].length === 0) {
                return res.status(404).json({
                    message: 'El registro con el UsuarioId especificado no existe'
                });
            }
            const [IngresoIdUnique] = await conn.query('SELECT PlanesIngresoId FROM PlanesIngresos WHERE IngresoId = ?', [updateEntry.IngresoId]);
            if (IngresoIdUnique.length !== 0 && IngresoIdUnique.PlanesIngresoId !== updateEntry.PlanesIngresoId) {
                return res.status(404).json({
                    message: 'Existe un registro con el mismo IngresoId'
                });
            }
        }
        await conn.query('UPDATE PlanesIngresos set ? WHERE PlanesIngresoId = ?', [updateEntry, id]);
        return res.json({
            message: 'Entrada de Clase actualizada'
        });
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
