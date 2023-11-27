import { Pool } from "pg";

 const pool = new Pool({
    user:'postgres',
    password:'28111960',
    host:'localhost',
    port:5432,
    database:'e_commerce'
})
export default pool
