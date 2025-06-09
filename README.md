# 🌧️ Alaga Menos — Sistema Mobile de Monitoramento de Áreas de Alagamento e Endereços Salvos

Este projeto consiste em um aplicativo mobile (React Native + Expo) que permite o **cadastro, edição e remoção de endereços**. Além disso, possibilita a **visualização do endereço no mapa** com integração com a **API do Google Maps**. 

O projeto também exibe **áreas de alagamento simuladas** no mapa.

---

## 🛠️ Tecnologias utilizadas

- **React Native com Expo**
- **TypeScript**
- **Axios** (para integração com API backend em .NET)
- **AsyncStorage** (para armazenamento local de informações complementares)
- **React Native Maps** (visualização dos endereços)
- **Google Maps Geocoding API** (para conversão de endereço em coordenadas geográficas)
- **React Navigation / Expo Router** (navegação no app)

---

## ⚙️ Funcionalidades

✅ Cadastro de endereço com os seguintes campos:

- Rua
- Bairro
- Cidade
- Estado
- CEP

✅ Edição e remoção de endereços cadastrados  

✅ Persistência dos dados:

- Campos integrados à **API de backend (.NET)**:
    - Rua
    - Bairro
    - Cidade
    - Estado
- Campo **CEP** salvo apenas no **AsyncStorage**  

✅ Visualização do endereço no **Google Maps** com:

- **Marker** no local salvo
- **Áreas de alagamento** (simuladas com círculos azuis no mapa)

✅ Modo claro/escuro do mapa

✅ Botões de navegação intuitivos

---

## 📋 Requisitos

- Projeto backend (.NET) com endpoints:
    - `GET /ruas`
    - `POST /ruas/inserir`
    - `PUT /ruas/atualizar/{id}`
    - `DELETE /ruas/deletar/{id}`

- Chave da **Google Maps API** habilitada para:
    - Geocoding API
    - Maps SDK for Android / iOS

- Emulador ou dispositivo com React Native + Expo rodando

---

## 🔑 Configuração necessária

No arquivo `app/(tabs)/mapa.tsx`, configurar sua API KEY:

```typescript
const GOOGLE_MAPS_API_KEY = 'SUA_GOOGLE_API_KEY_AQUI';
```

---


Este passo a passo mostra como utilizar e validar as principais funcionalidades do app.

### 1️⃣ Cadastro de endereço

1. Abra o app.
2. Acesse a aba "**Endereços**".
3. Clique no botão "**+ Novo Endereço**".
4. Preencha os seguintes campos:
    - Rua
    - Bairro
    - Cidade
    - Estado
    - CEP
5. Clique em "**Salvar Endereço**".
6. Verifique que o novo endereço aparece listado na tela de endereços.

### 2️⃣ Visualização no mapa

1. Na lista de endereços cadastrados, clique no botão "**Ver no mapa**" ao lado de um endereço.
2. A tela de mapa será aberta.
3. Verifique que:
    - O **endereço salvo** aparece com um **Marker** no mapa.
    - Áreas com **círculos azuis** indicam zonas de alagamento simuladas.

### 3️⃣ Edição de endereço

1. Na lista de endereços, clique em "**Editar**" em um dos endereços.
2. Altere um ou mais campos.
3. Salve novamente.
4. Verifique que a lista foi atualizada.

### 4️⃣ Exclusão de endereço

1. Na lista de endereços, clique em "**Excluir**" em um endereço.
2. Confirme a exclusão.
3. Verifique que o endereço foi removido da lista.

---

## Observações

✅ O **campo CEP** é armazenado apenas localmente no **AsyncStorage** (por decisão de projeto), pois não está previsto no modelo da API.

✅ **Rua, bairro, cidade e estado** são enviados para a API (`POST /ruas/inserir`).

✅ A tela de mapa faz uma **consulta em tempo real à API do Google Maps** para obter as coordenadas.

✅ As **áreas de alagamento** são simuladas, para fins demonstrativos.

---
### 🎥 Link para o vídeo demonstrativo

👉 https://youtu.be/WVpCTJ6Goj8

---
## 👨‍💻 Autores
Projeto Alaga Menos

Grupo Impacto Zero — Global Solution FIAP 2025


