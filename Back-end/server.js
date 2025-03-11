require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configurar conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: "Disaster2010",  
    database: "sistema"
});

db.connect(err => {
    if (err) {
        console.error("Error de conexión:", err);
        return;
    }
    console.log("Conectado a MySQL");
});

// Endpoint para el login
app.post("/login", (req, res) => {
    const { usu_nombre, usu_password } = req.body;

    const query = "SELECT * FROM usuarios WHERE usu_nombre = ? AND usu_password = ?";
    db.query(query, [usu_nombre, usu_password], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            return res.json({ success: false, message: "Usuario o contraseña incorrectos" });
        }

        res.json({ success: true, message: "Login exitoso", user: results[0] });
    });
});

app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
});