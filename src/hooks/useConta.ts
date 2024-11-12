import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetcher } from "../utils/fetcher"
import { Cliente, Conta, Transferencia } from "../types"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

interface TransferenciaComContas extends Transferencia {
  numeroContaOrigem: string
  numeroContaDestino: string
}

interface ContaComTransferencias extends Conta {
  transferencias: TransferenciaComContas[]
}

export const useContaComTransferencias = (
  contaId: number
): UseQueryResult<ContaComTransferencias> => {
  return useQuery<ContaComTransferencias>({
    queryKey: ["contaComTransferencias", contaId],
    queryFn: async () => {
      // 1. Buscar dados da conta
      const contaResponse = await fetcher<Conta>(`/contas/${contaId}`)
      const conta = contaResponse.data
      // 2. Buscar transferências feitas pela conta (conta como origem)
      const transferenciasFeitasResponse = await fetcher<Transferencia[]>(
        `/transferencias/buscarTransferenciasPorNumeroContaOrigem?numeroContaOrigem=${conta.id}`
      )
      const numeroContaOrigemEDestinoFeitas = await Promise.all(
        transferenciasFeitasResponse.data.map(async (transferencia) => {
          const contaDestinoResponse = await fetcher<Conta>(
            `/contas/${transferencia.id_conta_destino}`
          )
          const contaDestino = contaDestinoResponse.data
          return {
            ...transferencia,
            numeroContaDestino: contaDestino.numeroConta,
            numeroContaOrigem: conta.numeroConta,
          }
        })
      )

      // 3. Buscar transferências recebidas pela conta (conta como destino)
      const transferenciasRecebidasResponse = await fetcher<Transferencia[]>(
        `/transferencias/buscarTransferenciasPorNumeroContaDestino?numeroContaDestino=${conta.id}`
      )
      const numeroContaOrigemEDestinoRecebidas = await Promise.all(
        transferenciasRecebidasResponse.data.map(async (transferencia) => {
          const contaOrigemResponse = await fetcher<Conta>(
            `/contas/${transferencia.id_conta_origem}`
          )
          const contaOrigem = contaOrigemResponse.data
          return {
            ...transferencia,
            numeroContaOrigem: contaOrigem.numeroConta,
            numeroContaDestino: conta.numeroConta,
          }
        })
      )

      const todasTransferencias = [
        ...numeroContaOrigemEDestinoFeitas,
        ...numeroContaOrigemEDestinoRecebidas,
      ]

      // 4. Combinar transferências feitas e recebidas

      // 5. Retornar a conta com todas as transferências
      return {
        ...conta,
        transferencias: todasTransferencias,
      }
    },
  })
}

export const useConta = () => {
  const createConta = async (
    cpf: string,
    numeroConta: string,
    tipo: string
  ) => {
    const cliente = (
      await fetcher<Cliente>(`/clientes/buscarClientePorCpf?cpf=${cpf}`)
    ).data
    const response = await axios.post(`${API_URL}/contas`, {
      numeroConta,
      tipo,
      saldo: 0,
      id_cliente: cliente.id,
    })

    return response.data
  }

  return { createConta }
}
