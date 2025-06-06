import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { getEnderecos, deleteEndereco, Endereco } from '@/services/enderecos';

export default function EnderecosCadastrados() {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();
  const isFocused = useIsFocused();

  const carregarEnderecos = async () => {
    try {
      const dados = await getEnderecos();
      setEnderecos(dados);
    } catch (error) {
      console.error('Erro ao carregar enderecos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os endereços.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      carregarEnderecos();
    }
  }, [isFocused]);

  const excluirEndereco = async (id: number) => {
    Alert.alert('Confirmar Exclusão', 'Tem certeza que deseja excluir este endereço?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteEndereco(id);
            carregarEnderecos();
          } catch (error) {
            console.error('Erro ao excluir endereço:', error);
            Alert.alert('Erro', 'Falha ao excluir o endereço.');
          }
        }
      }
    ]);
  };

  const editarEndereco = (endereco: Endereco) => {
    router.push({
      pathname: '/(tabs)/cadastro',
      params: {
        ...endereco,
        editando: 'true',
        id: String(endereco.id),
      },
    });
  };

  const novoEndereco = () => {
    router.push({
      pathname: '/(tabs)/cadastro',
      params: {
        editando: 'false',
      },
    });
  };

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Carregando endereços...</Text>
      </View>
    );
  }

  return (
    <View style={styles.solidBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Endereços Cadastrados</Text>

        <TouchableOpacity style={styles.botaoNovo} onPress={novoEndereco}>
          <Text style={styles.textoBotao}>+ Novo Endereço</Text>
        </TouchableOpacity>

        {enderecos.length === 0 ? (
          <Text style={styles.naoEncontrado}>Nenhum endereço cadastrado.</Text>
        ) : (
          enderecos.map((endereco) => (
            <View key={endereco.id} style={styles.card}>
          <Text style={styles.cardText}><Text style={styles.label}>Rua:</Text> {endereco.nome_rua}</Text>
          <Text style={styles.cardText}><Text style={styles.label}>Bairro:</Text> {endereco.bairro}</Text>
          <Text style={styles.cardText}><Text style={styles.label}>Cidade:</Text> {endereco.cidade}</Text>
          <Text style={styles.cardText}><Text style={styles.label}>Estado:</Text> {endereco.estado}</Text>

          <View style={styles.botoes}>
            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => editarEndereco(endereco)}
            >
              <Text style={styles.textoBotao}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirEndereco(endereco.id!)}
            >
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#2196F3',
              padding: 8,
              borderRadius: 6,
              marginTop: 8,
            }}
            onPress={() =>
              router.push({
                pathname: '/mapa',
                params: {
                  nome_rua: endereco.nome_rua, bairro: endereco.bairro, cidade: endereco.cidade, estado: endereco.estado,
                },
              })
            }>
            <Text style={{ color: '#fff', textAlign: 'center' }}>Ver no mapa</Text>
          </TouchableOpacity>
        </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  solidBackground: {
    flex: 1,
    backgroundColor: '#052e54',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    color: '#ffd600',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  botaoNovo: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  botaoEditar: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  botaoExcluir: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  naoEncontrado: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5f96',
  },
});
