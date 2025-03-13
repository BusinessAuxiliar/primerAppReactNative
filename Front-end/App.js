/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { TextInput, Button, View, Text } from "react-native";

const App = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario, 
        password: contrasena, 
      }),
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
      console.log("Respuesta del servidor:", status, body);
      if (status === 200) {
        console.log("Login exitoso");
        setMensaje("Login exitoso");
      } else {
        console.error("Error de login:", body.message);
        setMensaje("Usuario o contraseña incorrectos");
      }
    })
    .catch((error) => {
      console.error("Error de conexión:", error);
      setMensaje("Error de conexión");
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

export default App;
