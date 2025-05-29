import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Params = {
  id?: string | string[];
  nome?: string | string[];
  rua?: string | string[];
  numero?: string | string[];
  bairro?: string | string[];
  cidade?: string | string[];
  estado?: string | string[];
  cep?: string | string[];
  complemento?: string | string[];
  editando?: string | string[];
};

export default function CadastroEndereco() {
  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [complemento, setComplemento] = useState('');

  const [editando, setEditando] = useState(false);
  const [idEdicao, setIdEdicao] = useState<number | null>(null);

  const params = useLocalSearchParams<Params>();
  const router = useRouter();

  useEffect(() => {
    const getString = (val: string | string[] | undefined): string =>
      Array.isArray(val) ? val[0] : val || '';

    if (getString(params.editando) === 'true' && params.id) {
      setEditando(true);
      setIdEdicao(Number(getString(params.id)));
      setNome(getString(params.nome));
      setRua(getString(params.rua));
      setNumero(getString(params.numero));
      setBairro(getString(params.bairro));
      setCidade(getString(params.cidade));
      setEstado(getString(params.estado));
      setCep(getString(params.cep));
      setComplemento(getString(params.complemento));
    }
  }, [params]);

  const salvarEndereco = async () => {
    if (!nome || !rua || !numero || !bairro || !cidade || !estado || !cep) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const dados = await AsyncStorage.getItem('enderecos');
      let enderecos = dados ? JSON.parse(dados) : [];

      if (editando && idEdicao !== null) {
        enderecos = enderecos.map((e: any) =>
          e.id === idEdicao
            ? { id: idEdicao, nome, rua, numero, bairro, cidade, estado, cep, complemento }
            : e
        );
        Alert.alert('Sucesso', 'Endereço atualizado com sucesso!');
      } else {
        const novo = {
          id: Date.now(),
          nome,
          rua,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          complemento
        };
        enderecos.push(novo);
        Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');
      }

      await AsyncStorage.setItem('enderecos', JSON.stringify(enderecos));
      limparCampos();
      router.replace('/enderecos');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o endereço.');
      console.error(error);
    }
  };

  const limparCampos = () => {
    setNome('');
    setRua('');
    setNumero('');
    setBairro('');
    setCidade('');
    setEstado('');
    setCep('');
    setComplemento('');
    setEditando(false);
    setIdEdicao(null);
  };

  return (
    <View style={styles.solidBackground}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          <Text style={styles.title}>
            {editando ? 'Editar Endereço' : 'Cadastro de Endereço'}
          </Text>

          <TextInput style={styles.input} placeholder="Nome do endereço" value={nome} onChangeText={setNome} />
          <TextInput style={styles.input} placeholder="Rua" value={rua} onChangeText={setRua} />
          <TextInput style={styles.input} placeholder="Número" keyboardType="numeric" value={numero} onChangeText={setNumero} />
          <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
          <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} />
          <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} />
          <TextInput style={styles.input} placeholder="CEP" keyboardType="numeric" value={cep} onChangeText={setCep} />
          <TextInput style={styles.input} placeholder="Complemento (opcional)" value={complemento} onChangeText={setComplemento} />

          <Button
            title={editando ? 'Atualizar Endereço' : 'Salvar Endereço'}
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
