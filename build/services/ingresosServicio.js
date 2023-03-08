"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInfoIngresoEntry = exports.getInfoIngreso = exports.updateIdEntry = exports.deleteIdEntry = exports.getIdEntry = exports.addEntry = exports.getAllEntries = void 0;
const conexion_1 = require("../conexion");
const utils_1 = require("../utils");
const enums_1 = require("../enums");
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
        const updateId = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [id]);
        if (updateId[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado en la ruta no existe' });
        }
        if (!isNaN(updateEntry.UsuarioId) && isNaN(updateEntry.ClienteId)) {
            const UsuarioIdExist = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [updateEntry.UsuarioId]);
            if (UsuarioIdExist[0].length === 0) {
                return res.status(404).json({
                    message: 'El registro con el UsuarioId especificado no existe'
                });
            }
        }
        if (isNaN(updateEntry.UsuarioId) && !isNaN(updateEntry.ClienteId)) {
            const ClienteIdExist = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [updateEntry.ClienteId]);
            if (ClienteIdExist[0].length === 0) {
                return res.status(404).json({
                    message: 'El registro con el ClienteId especificado no existe'
                });
            }
        }
        await conn.query('UPDATE Ingresos set ? WHERE IngresoId = ?', [updateEntry, id]);
        return res.json({
            message: 'Entrada de Ingreso actualizada'
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
async function getInfoIngreso(_req, res) {
    try {
        const conn = await (0, conexion_1.connect)();
        const getAll = await conn.query('SELECT i.IngresoId, u.Nombre as Usuario, c.DNI as Cliente, i.MontoTotal, i.Fecha, p.Nombre FROM gimnasio.Ingresos i JOIN gimnasio.Usuarios u ON i.UsuarioId = u.UsuarioId JOIN gimnasio.Clientes c ON c.ClienteId = i.ClienteId JOIN gimnasio.PlanesIngresos pi ON pi.IngresoId = i.IngresoId JOIN gimnasio.Planes p ON pi.PlanId = p.PlanId');
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
exports.getInfoIngreso = getInfoIngreso;
async function addInfoIngresoEntry(req, res) {
    try {
        const newEntry = (0, utils_1.addIngresoInfoEntry)(req.body);
        const ingresoEntry = {
            TipoIngreso: enums_1.TipoIngreso.Planes,
            UsuarioId: newEntry.UsuarioId,
            ClienteId: newEntry.ClienteId,
            MontoTotal: newEntry.MontoTotal,
            Fecha: new Date(new Date().toLocaleDateString('en-EN', { timeZone: 'America/Lima' }))
        };
        const conn = await (0, conexion_1.connect)();
        const UsuarioIdExist = await conn.query('SELECT * FROM Usuarios WHERE UsuarioId = ?', [ingresoEntry.UsuarioId]);
        const ClienteIdExist = await conn.query('SELECT * FROM Clientes WHERE ClienteId = ?', [ingresoEntry.ClienteId]);
        if (UsuarioIdExist[0].length === 0 && ClienteIdExist[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        const insertIngreso = await conn.query('INSERT INTO Ingresos SET ?', [ingresoEntry]);
        const planIngresoEntry = {
            PlanId: newEntry.PlanId,
            IngresoId: insertIngreso[0].insertId,
            FechaInicio: newEntry.FechaInicio
        };
        const IngresoIdUnique = await conn.query('SELECT * FROM PlanesIngresos WHERE IngresoId = ?', [planIngresoEntry.IngresoId]);
        const IngresoIdExist = await conn.query('SELECT * FROM Ingresos WHERE IngresoId = ?', [planIngresoEntry.IngresoId]);
        const [IngresoIsPlan] = await conn.query('SELECT TipoIngreso FROM Ingresos WHERE IngresoId = ?', [planIngresoEntry.IngresoId]);
        if (IngresoIsPlan[0].TipoIngreso !== 'planes') {
            return res.status(404).json({ message: 'El registro con el IngresoId especificado no es un ingreso para Planes' });
        }
        if (IngresoIdExist[0].length === 0) {
            return res.status(404).json({ message: 'El registro con el id especificado no existe' });
        }
        if (IngresoIdUnique[0].length !== 0) {
            return res.status(404).json({ message: 'Existe un registro con el mismo IngresoId' });
        }
        await conn.query('INSERT INTO PlanesIngresos SET ?', [planIngresoEntry]);
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
exports.addInfoIngresoEntry = addInfoIngresoEntry;
/*
} else {
      const result = await conn.query('INSERT INTO Clientes SET ?', [newEntry]) as RowDataPacket[]
      const insertedId = result[0].insertId
      const [client] = await conn.query('SELECT Nombre FROM Clientes WHERE ClienteId = ?', insertedId) as RowDataPacket[]
      return res.json({
        message: 'Entrada de Cliente añadida'
        client: client[0].Nombre
      })
    }
*/
