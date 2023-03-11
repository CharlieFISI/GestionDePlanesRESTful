import { createPool, Pool } from 'mysql2/promise'
import fs from 'fs'
const serverCA = [fs.readFileSync('DigiCertGlobalRootCA.crt.pem', 'utf8')]

export async function connect (): Promise<Pool> {
  const connection = createPool({
    host: 'mysql-titaniumgym-prod-001.mysql.database.azure.com',
    user: 'TitaniumBD',
    password: 'AdminMySQL1',
    database: 'gimnasio',
    port: 3306,
    ssl: {
      rejectUnauthorized: true,
      ca: serverCA
    }
  })
  return connection
}
