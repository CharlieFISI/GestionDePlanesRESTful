"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
async function connect() {
    const connection = (0, promise_1.createPool)({
        host: 'mysql-titaniumgym-prod-001.mysql.database.azure.com',
        user: 'TitaniumBD',
        password: 'AdminMySQL1',
        database: 'gimnasio',
        port: 3306
    });
    return connection;
}
exports.connect = connect;
