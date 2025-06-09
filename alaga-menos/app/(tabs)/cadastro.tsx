import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { postRua } from '@/services/ruas';

export default function CadastroEndereco() {
  const [nomeRua, setNomeRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const router = useRouter();

  const salvarEndereco = async () => {
    if (!nomeRua || !bairro || !cidade || !estado || !cep) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      // 1️⃣ Posta a rua na API
      await postRua({
        nomeRua,
        observacao: '',
        bairroId: 1 // valor fixo para testes (se selecionar 1 = Moema, 2 = Itaim Bibi, e 3 = Vila Mariana...)
      });

      // 2️⃣ Salva os dados extras no AsyncStorage
      const dados = await AsyncStorage.getItem('enderecos');
      let enderecos = dados ? JSON.parse(dados) : [];

      const novo = {
        id: Date.now(),
        nomeRua,
        bairro,
        cidade,
        estado,
        cep
      };

      enderecos.push(novo);
      await AsyncStorage.setItem('enderecos', JSON.stringify(enderecos));

      Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');
      limparCampos();
      router.replace('/enderecos');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o endereço.');
      console.error(error);
    }
  };

  const limparCampos = () => {
    setNomeRua('');
    setBairro('');
    setCidade('');
    setEstado('');
    setCep('');
  };

  return (
    <View style={styles.solidBackground}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Cadastro de Endereço</Text>

          <TextInput style={styles.input} placeholder="Nome da rua" value={nomeRua} onChangeText={setNomeRua} />
          <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
          <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
          <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} />
          <TextInput style={styles.input} placeholder="CEP" keyboardType="numeric" value={cep} onChangeText={setCep} />

          <Button
            title="Salvar Endereço"
            onPress={salvarEndereco}
            color="#28a745"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  solidBackground: {
    flex: 1,
    backgroundColor: '#052e54',
  },
  container: {
    padding: 10,
    marginTop: 40,
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: '#ffd600',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6
  }
});
