import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/utils/fetcher"
import { ClienteModel } from "@/types/clienteModel"

export function useClienteByCpf(cpf: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cliente", { cpf }],
    queryFn: () =>
      fetcher<ClienteModel>(`/clientes/buscarClientePorCpf?cpf=${cpf}`),
    enabled: !!cpf,
    staleTime: 1000 * 60 * 5,
  })

  return { data: data?.data, isLoading, refetchCliente: refetch }
}

export function useClienteById(id: number) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cliente", { id }],
    queryFn: () => fetcher<ClienteModel>(`/clientes/${id}`),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })

  return { data: data?.data, isLoading, refetchCliente: refetch }
}
