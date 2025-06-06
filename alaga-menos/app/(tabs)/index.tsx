import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <StatusBar style="light" />

      <Image
        source={require('../../assets/images/alagamenos.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ScrollView contentContainerStyle={styles.linksContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/cadastro")}>
          <Text style={styles.buttonText}>Cadastrar Endereço</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.linksContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/enderecos")}>
          <Text style={styles.buttonText}>Endereços Salvos</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.linksContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/mapa")}>
          <Text style={styles.buttonText}>Mapa</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.linksContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/integrantes")}>
          <Text style={styles.buttonText}>Desenvolvedores</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#052e54',
  },
  linksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    color: "#ffffff"
  },
  button: {
  borderColor: '#1c92ff',
  borderWidth: 2,
  backgroundColor: "white",
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
  elevation: 5,
  width: 200,
  alignItems: 'center',
  },
  logo: {
    width: 380,
    height: 500,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
