import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/utils/fetcher"
import { ContaModel } from "@/types/contaModel"

export function useContas(cpf: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["conta", { cpf }],
    queryFn: () =>
      fetcher<ContaModel[]>(`/contas/buscarContasPorCpfCliente?cpf=${cpf}`),
    enabled: !!cpf,
    staleTime: 1000 * 60 * 5,
  })

  return { data: data?.data, isLoading, refetchConta: refetch }
}
