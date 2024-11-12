import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetcher } from "../utils/fetcher"
import { Cliente, Conta } from "../types"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

interface ClienteComContas extends Cliente {
  contas: Conta[]
}

interface ClienteInput {
  nome: string
  cpf: string
  dataNascimento: string
}

export const useClienteComDadosCompletos = (
  clienteCpf: string
): UseQueryResult<ClienteComContas> => {
  return useQuery<ClienteComContas>({
    queryKey: ["clienteComDadosCompletos", clienteCpf],
    queryFn: async () => {
      // 1. Buscar dados do cliente
      const clienteResponse = await fetcher<Cliente>(
        `/clientes/buscarClientePorCpf?cpf=${clienteCpf}`
      )
      const cliente = clienteResponse.data

      // 2. Buscar as contas do cliente
      const contasResponse = await fetcher<Conta[]>(
        `/contas/buscarContasPorCpfCliente?cpf=${cliente.cpf}`
      )
      const contas = contasResponse.data

      // 4. Retornar o cliente com as contas e transferências
      return {
        ...cliente,
        contas,
      }
    },
  })
}

export const useCliente = () => {
  const createCliente = async (cliente: ClienteInput) => {
    const response = await axios.post(`${API_URL}/clientes`, cliente)
    return response.data
  }

  return { createCliente }
}
