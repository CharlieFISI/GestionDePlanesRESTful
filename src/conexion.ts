import { createPool, Pool } from 'mysql2/promise'

export async function connect (): Promise<Pool> {
  const connection = createPool({
    host: 'containers-us-west-127.railway.app',
    user: 'root',
    password: 'yqz3OYH3P8Va5jdFcmNw',
    database: 'gimnasio',
    port: 6435
    /* ssl: {
        rejectUnauthorized: true,
        ca: serverCA
      } */
  })
  return connection
}
