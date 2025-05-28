import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Integrante from "../Components/Integrante";
import { BlurView } from 'expo-blur';

export default function DevsPage() {
  return (
    <LinearGradient
      colors={['#ff5f96', '#ffe66d']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen
          options={{
            title: "Devs",
          }}
        />
        <Text style={styles.title}>Desenvolvedores</Text>

        <Integrante
          nome="Gustavo de Aguiar"
          rm="557707"
          sala="2TDSPF"
          imgSrc={require("../../assets/images/gu.png")}
          githubUrl="https://github.com/gudeaguiar"
          linkedinUrl="https://www.linkedin.com/in/gustavo-de-aguiar-sn160308/"
        />

        <Integrante
          nome="Julio Cesar"
          rm="557298"
          sala="2TDSPF"
          imgSrc={require("../../assets/images/julio.png")}
          githubUrl="https://github.com/Julio-CRodrigues"
          linkedinUrl="https://www.linkedin.com/in/julio-cesar-rodrigues29/"
        />

        

        <Integrante
          nome="Matheus de Freitas Silva"
          rm="552602"
          sala="2TDSPF"
          imgSrc={require("../../assets/images/julio.png")}
          githubUrl="https://github.com/MatheusFreitasSilva"
          linkedinUrl="https://www.linkedin.com/in/matheus-freitas-9110a51b2/"
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 23,
    color: "#333",
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 24,
    marginTop: 40,
  },
  githubUrl: {
    color: "#5e17eb",
  },
});
