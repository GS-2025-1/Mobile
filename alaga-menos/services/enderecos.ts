import axios from 'axios';

const API_URL = 'http://localhost:5197/enderecos';

export type Endereco = {
  id?: number;
  nome_rua: string;
  bairro: string;
  cidade: string;
  estado: string;
};

export async function getEnderecos(): Promise<Endereco[]> {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function postEndereco(endereco: Endereco): Promise<void> {
  await axios.post(API_URL, endereco);
}

export async function putEndereco(id: number, endereco: Endereco): Promise<void> {
  await axios.put(`${API_URL}/${id}`, endereco);
}

export async function deleteEndereco(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
