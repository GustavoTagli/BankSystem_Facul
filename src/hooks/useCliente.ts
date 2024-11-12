import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetcher } from "../utils/fetcher"
import { Cliente, Conta } from "../types"

interface ClienteComContas extends Cliente {
  contas: Conta[]
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
