const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors()); // Permitir peticiones desde React Native

// Conectar a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",  // Cambia según tu configuración
  password: "",  // Cambia según tu configuración
  database: "usuarios",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a MySQL ✅");
  }
});

// 🔑 Endpoint para iniciar sesión
app.post("/login", (req, res) => {s
  const { email, password } = req.body;

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });

    if (results.length > 0) {
      // Comprobar contraseña
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (isMatch) {
          res.json({ success: true, message: "Login exitoso" });
        } else {
          res.json({ success: false, message: "Contraseña incorrecta" });
        }
      });
    } else {
      res.json({ success: false, message: "Usuario no encontrado" });
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
