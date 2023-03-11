"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const ingresosServicio_1 = require("../services/ingresosServicio");
const router = express_1.default.Router();
router.route('/')
    .get(ingresosServicio_1.getAllEntries)
    .post(ingresosServicio_1.addEntry);
router.route('/plan')
    .get(ingresosServicio_1.getInfoIngreso)
    .post(ingresosServicio_1.addInfoIngresoEntry);
router.route('/:id')
    .get(ingresosServicio_1.getIdEntry)
    .delete(ingresosServicio_1.deleteIdEntry)
    .put(ingresosServicio_1.updateIdEntry);
exports.default = router;
