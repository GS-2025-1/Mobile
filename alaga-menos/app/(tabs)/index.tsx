import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <LinearGradient
      colors={['#535353', '#1c92ff']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <StatusBar style="light" />

      <Image
        source={require('../../assets/images/gu.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      
      <ScrollView contentContainerStyle={styles.linksContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/(tabs)/integrantes")}>
          <Text style={styles.buttonText}>Desenvolvedores</Text>
        </TouchableOpacity>
      </ScrollView>

      

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  linksContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    color: "#5e17eb"
  },
  button: {
    borderColor: '#ffffff',
    backgroundColor: "#535353",
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
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
