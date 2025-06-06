import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { postEndereco, putEndereco } from '@/services/enderecos';

type Params = {
  id?: string | string[];
  nome_rua?: string | string[];
  bairro?: string | string[];
  cidade?: string | string[];
  estado?: string | string[];
  editando?: string | string[];
};

export default function CadastroEndereco() {
  const [nomeRua, setNomeRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

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
      setNomeRua(getString(params.nome_rua));
      setBairro(getString(params.bairro));
      setCidade(getString(params.cidade));
      setEstado(getString(params.estado));
    }
  }, [params]);

  const salvarEndereco = async () => {
    if (!nomeRua || !bairro || !cidade || !estado) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const endereco = {
      nome_rua: nomeRua,
      bairro,
      cidade,
      estado
    };

    try {
      if (editando && idEdicao !== null) {
        await putEndereco(idEdicao, endereco);
        Alert.alert('Sucesso', 'Endereço atualizado com sucesso!');
      } else {
        await postEndereco(endereco);
        Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');
      }

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

          <TextInput
            style={styles.input}
            placeholder="Rua"
            value={nomeRua}
            onChangeText={setNomeRua}
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={cidade}
            onChangeText={setCidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={estado}
            onChangeText={setEstado}
          />

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
