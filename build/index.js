"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = require("./app");
const router = (0, express_1.Router)();
const port = 3031;
router.get('/', (_req, res) => res.json('Bienvenido a mi API'));
router.get('/ping', (_req, res) => {
    console.log('Alguien ha hecho ping ' + new Date().toLocaleDateString());
    res.send('pong');
});
exports.default = router;
async function main() {
    const app = new app_1.App(port);
    await app.listen();
}
void main();
