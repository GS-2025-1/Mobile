import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';

const GOOGLE_MAPS_API_KEY = 'AIzaSyD8Zv-YC0LgO1RcikKzybw7ihKKW9-Hj5g';

const mapDarkStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
];

const mapLightStyle: any[] = [];

const alagamentosFicticios = [
  { lat: -23.55052, lng: -46.633308, nome: 'Centro de SP' },
  { lat: -23.513377, lng: -46.670744, nome: 'Av. Eng. Caetano Álvares (Limão)' },
  { lat: -23.588862, lng: -46.544521, nome: 'Av. Anhaia Mello (estação São Lucas) ' },
  { lat: -23.593564, lng: -46.590481, nome: 'Av. Presidente Wilson (Estação Tamanduateí)' },
  { lat: -23.507059, lng: -46.747651, nome: 'Jardim Santo Elias (Avenida 1)' },
  { lat: -23.525682, lng: -46.681808, nome: 'Av. Pompéia (Shopping Bourbon)' }
];

export default function LocalizacaoMapa() {
  const { nome_rua, bairro, cidade, estado } = useLocalSearchParams();
  const router = useRouter();
  const [coordenadas, setCoordenadas] = useState<{ latitude: number; longitude: number } | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [raio, setRaio] = useState(300);
  const [direcao, setDirecao] = useState(1);
  const [modoEscuro, setModoEscuro] = useState(true);
  const [localAtual, setLocalAtual] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (nome_rua && bairro && cidade && estado) {
      buscarCoordenadasGoogleMaps(nome_rua as string, bairro as string, cidade as string, estado as string);
    }
    buscarLocalAtual();
  }, [nome_rua, bairro, cidade, estado]);

  const buscarLocalAtual = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      setLocalAtual({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    }
  };

  const buscarCoordenadasGoogleMaps = async (
    nome_rua: string,
    bairro: string,
    cidade: string,
    estado: string
  ) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${nome_rua},${bairro},${cidade},${estado},Brasil&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCoordenadas({ latitude: location.lat, longitude: location.lng });
      } else {
        console.warn('Resposta do Google:', data.status);
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      setRaio((prev) => {
        if (prev >= 350) setDirecao(-1);
        if (prev <= 250) setDirecao(1);
        return prev + 6 * direcao;
      });
    }, 100);
    return () => clearInterval(intervalo);
  }, [direcao]);

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando mapa...</Text>
      </View>
    );
  }

  if (!coordenadas) {
    return (
      <View style={styles.loading}>
        <Text>Não foi possível exibir a localização para o endereço informado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordenadas.latitude,
          longitude: coordenadas.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        customMapStyle={modoEscuro ? mapDarkStyle : mapLightStyle}
        showsUserLocation
      >
        <Marker
          coordinate={coordenadas}
          title="Endereço informado"
          description={`${nome_rua}, ${bairro}, ${cidade} - ${estado}`}
        />

    {alagamentosFicticios.map((loc, index) => (
  <>
    <Marker
      key={`alag-${index}`}
      coordinate={{ latitude: loc.lat, longitude: loc.lng }}
      title={loc.nome}
      description="Área com histórico de alagamento"
      opacity={0}
    />
    <Circle
      key={`circulo-${index}`}
      center={{ latitude: loc.lat, longitude: loc.lng }}
      radius={raio}
      strokeWidth={2}
      strokeColor="rgba(0, 174, 255, 0.6)"
      fillColor="rgba(4, 0, 255, 0.57)"
    />
  </>
))}
      </MapView>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModoEscuro(!modoEscuro)}
        style={styles.toggleButton}
      >
        <Text style={styles.toggleText}>{modoEscuro ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>As áreas em azul estão alagadas. Endereço informado:</Text>
        <Text style={styles.cardCep}>{nome_rua}, {bairro}, {cidade} - {estado}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#ffffffdd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  backText: {
    fontWeight: 'bold',
    color: '#333',
  },
  toggleButton: {
    position: 'absolute',
    top: 100,
    left: 20,
    backgroundColor: '#ffffffdd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  toggleText: {
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#ffffffee',
    borderRadius: 12,
    padding: 16,
    elevation: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
  },
  cardCep: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
});
