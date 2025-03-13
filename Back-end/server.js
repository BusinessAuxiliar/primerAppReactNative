
import express from "express"; 
import mysql from'mysql';
import  crypto  from 'crypto';
import cors  from 'cors';
import dotenv from "dotenv"

const app = express();
const port = 3001;

dotenv.config()
app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar con MySQL:', err);
        return;
    }
    console.log('✅ Conectado a la base de datos MySQL');
});


function encryptPassword(password) {
    const algorithm = 'aes-128-ecb';  
    const key = Buffer.from('2lrRKQfHzxACgOG0', 'utf8');

    const cipher = crypto.createCipheriv(algorithm, key, null);
    cipher.setAutoPadding(true);

    let encrypted = cipher.update(password, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return encrypted;
}


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan datos en la solicitud' });
    }

    const query = 'SELECT * FROM usuarios WHERE usu_nombre = ?';

    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('❌ Error en la consulta:', err);
            return res.status(500).json({ message: 'Error al procesar la solicitud' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];
        const encryptedPassword = encryptPassword(password);

        console.log('Contraseña encriptada ingresada:', encryptedPassword);
        console.log('Contraseña almacenada en BD:', user.usu_password_encryp);


        if (encryptedPassword === user.usu_password_encryp) {
            return res.status(200).json({
                message: '✅ Login exitoso',
                userId: user.usu_id,
                username: user.usu_nombre,
            });
        } else {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});