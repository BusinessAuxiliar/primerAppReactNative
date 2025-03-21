/* eslint-disable prettier/prettier */  
import React, { useState } from "react";
import { TextInput, Button, View, Text } from "react-native";


const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = () => {
    console.log("Intentando iniciar sesión con:", usuario, contrasena); // 🛠️ Verifica que se capturen los datos
  
    fetch("http://localhost:8081/login", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        password: contrasena,
      }),
    })
    .then(response => {
      console.log("Respuesta del servidor:", response);
      return response.json().then(data => ({ status: response.status, body: data }));
    })
    .then(({ status, body }) => {
      console.log("Datos recibidos del servidor:", body);
  
      if (status === 200) {
        setMensaje("✅ Login exitoso");
      } else {
        setMensaje("Usuario o contraseña incorrectos");
      }
    })
    .catch(error => {
      console.error("❌ Error en la conexión:", error);
      setMensaje("Error de conexión con el servidor");
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      {mensaje ? <Text style={{ marginTop: 10 }}>{mensaje}</Text> : null}
    </View>
  );
};

export default Login;