import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/utils/fetcher"
import { ContaModel } from "@/types/contaModel"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export function useConta(id: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["conta", { id }],
    queryFn: () => fetcher<ContaModel>(`/contas/${id}`),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })

  const transaction = async (
    id_conta_origem: number,
    id_conta_destino: number,
    valor: number
  ) => {
    try {
      const response = await axios.post(`${API_URL}/transferencias`, {
        id_conta_origem,
        id_conta_destino,
        valor,
        data: new Date().toISOString(),
      })
      console.log(response.data)
      return response.data // Retorne os dados da resposta
    } catch (error) {
      // Trate o erro da maneira que preferir
      console.error("Erro ao realizar a transferência:", error)
      throw error // Lança o erro para que possa ser tratado onde a função é chamada
    }
  }

  return { data: data?.data, isLoading, refetch, transaction }
}
