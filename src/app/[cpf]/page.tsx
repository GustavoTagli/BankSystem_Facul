"use client"

import Loader from "@/components/loader"
import { useClienteComDadosCompletos } from "@/hooks/useCliente"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function Cliente({
  params,
}: {
  params: Promise<{ cpf: string }>
}) {
  const resolvedParams = use(params)
  const { cpf } = resolvedParams
  const { data, isLoading } = useClienteComDadosCompletos(cpf)
  const router = useRouter()

  if (isLoading) {
    return <Loader />
  }

  if (!data) {
    return <p className="text-zinc-50">Cliente não encontrado</p>
  }

  const handleClick = (id: number) => {
    router.push(`/${cpf}/${id}`)
  }

  return (
    <div className="text-zinc-50">
      <header className="flex flex-col gap-2 bg-emerald-800 p-4">
        <p className="text-md">BankSystem</p>
        <h2 className="text-3xl">{`Olá, ${data?.nome}!`}</h2>
      </header>
      <div className="flex flex-col gap-4 m-4">
        {data?.contas.length === 0 ? (
          <h2 className="text-2xl">Nenhuma conta ativa</h2>
        ) : (
          <h2 className="text-2xl">Contas ativas</h2>
        )}

        <button className="w-32 p-0 m-0 border-b-2 border-b-emerald-800 hover:border-b-emerald-500">
          <a href={`/${cpf}/nova-conta`}>Abrir nova conta</a>
        </button>
        {data?.contas.map((conta) => (
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
