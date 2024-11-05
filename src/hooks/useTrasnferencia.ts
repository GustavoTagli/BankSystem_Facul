import { TransferenciaModel } from "@/types/transferenciaModel"
import { fetcher } from "@/utils/fetcher"
import { useQuery } from "@tanstack/react-query"

export function useTransferencia(id: number) {
  const { data, refetch } = useQuery({
    queryKey: ["transferencia", { id }],
    queryFn: () =>
      fetcher<TransferenciaModel[]>(
        `/transferencias/buscarTransferenciasPorNumeroContaOrigem?numeroContaOrigem=${id}`
      ),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })

  return { data: data?.data, refetch }
}
