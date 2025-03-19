
import CryptoJS from "crypto-js";
import cors  from 'cors';

import { getUserById,
         getEmailById,
         getEmpresaByEmpId
 } from "./app";
import cors from "cors"; 

const corsOptions = {
    origin: "https://127.0.0.1:5173", // specify the allowed origin 
    methods: ["POST", "GET"],  // specify the allowed methods 
    credentials : true, //allow sending crdentials (cookies, authentication)
};





app.use(cors());
app.use(express.json());

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

            var claveSecreta = '2lrRKQfHzxACgOG0D1hDDAK3a3b98zfe2lrRKQfHzxACgOG0D1hDDAK3a3b98zfe'; // 32 bytes, para AES-128 se toma solo los primeros 16 bytes
        
            // Truncamos la clave a 16 bytes para AES-128
            var claveAES128 = claveSecreta.slice(0, 16);  // Clave de 16 bytes para AES-128
        
            // Asegúrate de que el texto cifrado esté en base64
            var textoCifradoBase64 = CryptoJS.enc.Base64.parse(textoCifrado);
        
            // Convertimos la clave secreta en formato UTF-8
            var key = CryptoJS.enc.Utf8.parse(claveAES128); // Usamos solo los primeros 16 bytes
        
            // Desencriptamos el texto cifrado
            var decrypted = CryptoJS.AES.decrypt(textoCifradoBase64, key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
        
            // Convertimos la salida en texto legible
            return decrypted.toString(CryptoJS.enc.Utf8);
        }
        // function desencriptarAES128(textoCifrado) {

        //   const  claveSecreta = '2lrRKQfHzxACgOG0D1hDDAK3a3b98zfe';
        //  textoCifrado = user.usu_password_encryp;
         
        //    // Convertimos la clave secreta en formato UTF-8 y luego en una clave de 128 bits
        //    const key = CryptoJS.enc.Utf8.parse(claveSecreta);
            
        //    // Desencriptamos el texto cifrado
        //    const decrypted = CryptoJS.AES.decrypt(textoCifrado, key, {
        //        mode: CryptoJS.mode.ECB,
        //        padding: CryptoJS.pad.NoPadding // ACA ESTA EL PROBLEMA PKS5PADDING
        //    });
         
        //    // Convertimos la salida en texto legible
        //    return decrypted.toString(CryptoJS.enc.Utf8);
        //  }

        console.log('Contraseña sin desencriptar', user.usu_password_encryp);
        const contrasenaDesencriptada = desencriptarAES128(user.usu_password_encryp);

       
        console.log('Contraseña desencriptada a comparar:', contrasenaDesencriptada);
        console.log('Contraseña ingresada por el usuario:', password);


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

