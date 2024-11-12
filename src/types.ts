// types.ts
export interface Cliente {
  id: number
  nome: string
  cpf: string
  dataNascimento: string
}

export interface Endereco {
  id: number
  rua: string
  numero: string
  cidade: string
  estado: string
  cep: string
  id_cliente: number
}

export interface Conta {
  id: number
  numeroConta: string
  saldo: number
  tipo: string
  id_cliente: number
}

export interface Transferencia {
  id: number
  data: string
  valor: number
  id_conta_origem: number
  id_conta_destino: number
}
