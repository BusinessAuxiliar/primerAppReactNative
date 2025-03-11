import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

export default function Example() {
  const [form, setForm] = useState({
    nombre: "",
    contraseña: "",
  });

  const handleLogin = async () => {
    if (!form.nombre || !form.contraseña) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("✅ Éxito", "Sesión iniciada con éxito.");
      } else {
        Alert.alert(
          "❌ Error",
          data.message || "Usuario o contraseña incorrectos.",
        );
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{
              uri: "https://www.hwm.com.ar/logo.png",
            }}
          />

          <Text style={styles.title}>
            Inicia sesión en <Text style={{ color: "#075eec" }}>HWM</Text>
          </Text>

          <Text style={styles.subtitle}>
            Accedé a la mejor manera de gestión
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(text) => setForm({ ...form, nombre: text })}
              placeholder="Nombre"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.nombre}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(text) => setForm({ ...form, contraseña: text })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.contraseña}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Iniciar sesión</Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.formLink}>Me olvidé la contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.formFooter}>
          ¿No tenés cuenta?{" "}
          <Text style={{ textDecorationLine: "underline" }}>Registrate</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  headerImg: { width: 100, height: 100, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#6b7280", textAlign: "center" },
  form: { marginTop: 20 },
  input: { marginBottom: 15 },
  inputLabel: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  inputControl: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  formAction: { marginTop: 10 },
  btn: {
    backgroundColor: "#075eec",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16 },
  formLink: { textAlign: "center", color: "#075eec", marginTop: 10 },
  formFooter: { textAlign: "center", marginTop: 20, color: "#6b7280" },
});
