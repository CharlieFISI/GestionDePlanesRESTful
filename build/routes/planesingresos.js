"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = __importDefault(require("express"));
const planesingresosServicio_1 = require("../services/planesingresosServicio");
const router = express_1.default.Router();
router.route('/')
    .get(planesingresosServicio_1.getAllEntries)
    .post(planesingresosServicio_1.addEntry);
router.route('/:id')
    .get(planesingresosServicio_1.getIdEntry)
    .delete(planesingresosServicio_1.deleteIdEntry)
    .put(planesingresosServicio_1.updateIdEntry);
exports.default = router;
