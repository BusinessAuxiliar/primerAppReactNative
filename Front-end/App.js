/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { TextInput, Button, View } from "react-native";

const App = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const handleLogin = () => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario, // Usa el estado de usuario
        password: contrasena, // Usa el estado de contrasena
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Login exitoso");
        } else {
          console.error("Error de login:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error de conexión:", error);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario} // Actualiza el estado de 'usuario'
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena} // Actualiza el estado de 'contrasena'
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

export default App;