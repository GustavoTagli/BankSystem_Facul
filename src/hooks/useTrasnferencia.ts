import { Conta } from "@/types"
import { fetcher } from "@/utils/fetcher"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export function useTransferencia() {
  const doTransaction = async (
    id_conta_origem: number,
    numero_conta_destino: number,
    valor: number
  ) => {
    try {
      const conta_destino = await fetcher<Conta>(
        `/contas/buscarContaPorNumero?numeroConta=${numero_conta_destino}`
      ).then((response) => response.data)

      const response = await axios.post(`${API_URL}/transferencias`, {
        id_conta_origem,
        id_conta_destino: conta_destino.id,
        valor,
      })
      return response.data // Retorne os dados da resposta
    } catch (error) {
      // Trate o erro da maneira que preferir
      console.error("Erro ao realizar a transferência:", error)
      throw error // Lança o erro para que possa ser tratado onde a função é chamada
    }
  }

  return { doTransaction }
}
