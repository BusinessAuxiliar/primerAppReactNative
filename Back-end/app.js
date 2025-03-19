import mysql from'mysql2';
import dotenv from "dotenv";
import express from "express"; 

const app = express();
const port = 3001;


dotenv.config()
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
.promise();

const testConnection = async () => {
    try {
        const connection = await pool.getConnection(); // Intenta obtener una conexión
        console.log('✅ Conectado a la base de datos MySQL');
        connection.release(); // Libera la conexión
    } catch (err) {
        console.error('❌ Error al conectar con MySQL:', err);
    }
};

// Llamamos a la función
testConnection();

export default pool;


// const connection = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,ss

// connection.connect((err) => {
//     if (err) {
//         console.error('❌ Error al conectar con MySQL:', err);
//         return;
//     }
//     console.log('✅ Conectado a la base de datos MySQL');
// });


 export async function getUserById(usu_id){
     const [row] = await createPool.query (`SELECT * FROM usuarios WHERE id = ?`, [usu_id])

 return row[0]; // tomamos solo el primerio porque es uno solo
}


export async function getEmpresaByEmpId(usu_id) { 
const [rows] = await createPool.query(`SELECT empresas.*
FROM usuarios
LEFT JOIN empresas ON usuarios.emp_id = empresas.emp_id
WHERE usuarios.usu_id = ?
 `, [usu_id] 
)
return rows  // tomamos varias por eso rows 
}


export async function getEmailById(usu_id) {
    const [row] = await createPool.query(`SELECT usuarios.usu_email FROM usuarios WHERE id = ?`, [usu_id])
    return row;
}


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});