// services/ruas.ts

import axios from 'axios';

const API_URL = 'http://172.173.176.67:5000/ruas'; // ajuste o IP da VM se necessário

export type Rua = {
  id?: number;
  nomeRua: string;
  observacao?: string;
  bairroId: number; // para o POST (vou explicar na tela de cadastro)
};

export async function getRuas(): Promise<Rua[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function postRua(rua: Rua): Promise<void> {
  await axios.post(`${API_URL}/inserir`, rua);
}

export async function putRua(id: number, rua: Rua): Promise<void> {
  await axios.put(`${API_URL}/atualizar/${id}`, rua);
}

export async function deleteRua(id: number): Promise<void> {
  await axios.delete(`${API_URL}/deletar/${id}`);
}
