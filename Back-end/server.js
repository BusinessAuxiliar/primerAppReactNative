import express from "express"; 
import mysql from'mysql';
import CryptoJS from "crypto-js";
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


// function encryptPassword(password) {
//     const algorithm = 'aes-128-ecb';  
//     const key = Buffer.from('2lrRKQfHzxACgOG0', 'utf8');

//     const cipher = crypto.createCipheriv(algorithm, key, null);
//     cipher.setAutoPadding(true);

//     let encrypted = cipher.update(password, 'utf8', 'base64');
//     encrypted += cipher.final('base64');

//     return encrypted;
// }




// function desencriptarAES128(textoCifrado, claveSecreta) {

//    claveSecreta = '2lrRKQfHzxACgOG0D1hDDAK3a3b98zfe';
//    textoCifrado = user.usu_password_encryp;

//   // Convertimos la clave secreta en formato UTF-8 y luego en una clave de 128 bits
//   var key = crypto.enc.Utf8.parse(claveSecreta);

//   // Desencriptamos el texto cifrado
//   var decrypted = crypto.AES.decrypt(textoCifrado, key, {
//       mode: crypto.mode.ECB,
//       padding: crypto.pad.Pkcs7
//   });

//   // Convertimos la salida en texto legible
//   return decrypted.toString(crypto.enc.Utf8);
// }


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




        function desencriptarAES128(textoCifrado) {

            claveSecreta = '2lrRKQfHzxACgOG0D1hDDAK3a3b98zfe';
            textoCifrado = user.usu_password_encryp;
         
           // Convertimos la clave secreta en formato UTF-8 y luego en una clave de 128 bits
           var key = CryptoJS.enc.Utf8.parse(claveSecreta);
         
           // Desencriptamos el texto cifrado
           var decrypted = CryptoJS.AES.decrypt(textoCifrado, key, {
               mode: CryptoJS.mode.ECB,
               padding: CryptoJS.pad.Pkcs7 // ACA ESTA EL PROBLEMA PKS5PADDING
           });
         
           // Convertimos la salida en texto legible
           return decrypted.toString(CryptoJS.enc.Utf8);
         }

        console.log('Contraseña sin desencriptar', user.usu_password_encryp);
        const contrasenaDesencriptada = desencriptarAES128(user.usu_password_encryp);

       
        console.log('Contraseña desencriptada a comparar:', contrasenaDesencriptada);
        console.log('Contraseña almacenada en BD:', password);


        if (contrasenaDesencriptada === password) {
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