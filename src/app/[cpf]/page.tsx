"use client"

import { useClienteByCpf } from "@/hooks/useCliente"
import { useContas } from "@/hooks/useContas"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function Cliente({
  params,
}: {
  params: Promise<{ cpf: string }>
}) {
  const resolvedParams = use(params)
  const { cpf } = resolvedParams
  const { data, isLoading } = useClienteByCpf(cpf)
  const { data: contas } = useContas(cpf)
  const router = useRouter()

  if (!cpf) {
    return <p>CPF não encontrado</p>
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  const handleClick = (id: number) => {
    router.push(`/${cpf}/conta?id_conta=${id}`)
  }

  return (
    <div className="text-zinc-50">
      <h1 className="text-2xl absolute right-4 top-4">BankSystem</h1>
      <div className="bg-emerald-800 p-4">
        <h1 className="text-3xl">{`Olá, ${data?.nome}!`}</h1>
      </div>
      <div className="flex flex-col gap-4 m-4">
        <h2 className="text-2xl">Contas ativas</h2>
        {contas?.map((conta) => (
          <div
            key={conta.numeroConta}
            className="cursor-pointer bg-zinc-700 rounded-md w-3/5 p-2"
          >
            <h2 className="text-2xl">{`Conta: ${conta.numeroConta} - ${conta.tipo}`}</h2>
            <button
              onClick={() => handleClick(conta.id)}
              className="border-b-2 border-b-emerald-600 hover:text-emerald-600"
            >
              Acessar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
