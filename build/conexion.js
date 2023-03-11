"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const promise_1 = require("mysql2/promise");
const fs_1 = __importDefault(require("fs"));
const serverCA = [fs_1.default.readFileSync('DigiCertGlobalRootCA.crt.pem', 'utf8')];
async function connect() {
    const connection = (0, promise_1.createPool)({
        host: 'mysql-titaniumgym-prod-001.mysql.database.azure.com',
        user: 'TitaniumBD',
        password: 'AdminMySQL1',
        database: 'gimnasio',
        port: 3306,
        ssl: {
            rejectUnauthorized: true,
            ca: serverCA
        }
    });
    return connection;
}
exports.connect = connect;
