import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Sobre() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Sobre o Projeto</Text>

      <Text style={styles.texto}>
        O projeto <Text style={styles.destaque}>Alaga Menos</Text> é uma solução desenvolvida com foco na prevenção e
        monitoramento de alagamentos em áreas urbanas de risco.
      </Text>

      <Text style={styles.texto}>
        A aplicação permite que usuários cadastrem seus endereços e visualizem em um mapa a localização informada,
        junto a zonas de risco baseadas em dados reais ou simulados de alagamentos.
      </Text>

      <Text style={styles.texto}>
        As informações dos usuários e das ruas são armazenadas de forma centralizada em um banco de dados Oracle e
        acessadas via uma API REST desenvolvida em .NET.
      </Text>

      <Text style={styles.texto}>
        O objetivo é oferecer uma ferramenta que ajude moradores e órgãos públicos a tomarem decisões mais rápidas e
        seguras diante de chuvas intensas e situações de emergência.
      </Text>

      <Text style={styles.subtitulo}>Funcionalidades principais:</Text>
      <Text style={styles.item}>• Cadastro e listagem de endereços</Text>
      <Text style={styles.item}>• Exibição de mapa com pontos de alagamento</Text>
      <Text style={styles.item}>• Integração com API do Google Maps</Text>
      <Text style={styles.item}>• Estrutura de banco relacional Oracle</Text>

      <Text style={styles.textoFinal}>Global Solution - Grupo Impacto Zero</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#052e54',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd600',
    marginBottom: 16,
    marginTop: 40,
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'justify',
  },
  destaque: {
    color: '#ffe66d',
    fontWeight: 'bold',
  },
  item: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
    marginLeft: 8,
  },
  textoFinal: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    color: '#ccc',
  },
});
