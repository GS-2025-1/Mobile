import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Integrante from "../Components/Integrante";

export default function DevsPage() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          imgSrc={require("../../assets/images/matheus.png")}
          githubUrl="https://github.com/MatheusFreitasSilva"
          linkedinUrl="https://www.linkedin.com/in/matheus-freitas-9110a51b2/"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052e54',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 23,
    color: "#ffd600",
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 24,
    marginTop: 40,
  },
});
