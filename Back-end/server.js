const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const port = 3001;

// Habilitar CORS
app.use(cors());

// Middleware para leer datos JSON
app.use(express.json());

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: 'Disaster2010', // Cambia esto por tu contraseña de MySQL
    database: 'sistema' // Cambia el nombre de la base de datos si es necesario
});

// Conexión a la base de datos MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Función para desencriptar la contraseña
function decryptPassword(encryptedPassword) {
    const algorithm = 'aes-256-ecb'; // Algoritmo de cifrado sin IV (modo ECB)
    const key = '2lrRKQfHzxACgOG0D1hDDAK3a3b98zfe'; // Debe ser la misma que se usó al cifrar
    
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), null); // No necesitamos IV
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}

// Endpoint de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;  // Recibimos el nombre de usuario y contraseña desde el frontend

    // Consulta para obtener el usuario de la base de datos
    const query = 'SELECT * FROM usuarios WHERE usu_nombre = ?';
    
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error al procesar la solicitud');
        }
        
        // Si no se encuentra el usuario
        if (results.length === 0) {
            return res.status(401).send('Usuario no encontrado');
        }

        const user = results[0];

        // Desencriptar la contraseña almacenada en la base de datos
        const decryptedPassword = decryptPassword(user.usu_password_encryp);

        // Comparar la contraseña ingresada con la desencriptada
        if (decryptedPassword === password) {
            // Si la contraseña es correcta, enviamos una respuesta de éxito
            return res.status(200).json({
                message: 'Login exitoso',
                userId: user.usu_id,
                username: user.usu_nombre,
                level: user.nivel_id
            });
        } else {
            // Si la contraseña no es correcta, enviamos un error
            return res.status(401).send('Contraseña incorrecta');
        }
    });
});

// Iniciar servidor en el puerto 3001
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});