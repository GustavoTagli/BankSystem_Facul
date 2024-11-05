"use client"

import { useClienteById } from "@/hooks/useCliente"
import { useConta } from "@/hooks/useConta"
import { useTransferencia } from "@/hooks/useTrasnferencia"
import formatCurrency from "@/utils/formatCurrency"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Conta() {
  const conta_id = useSearchParams().get("id_conta") || ""
  const { data: conta, isLoading, refetch, transaction } = useConta(conta_id)
  const { data } = useClienteById(conta?.id_cliente || 0)
  const { data: transferencias, refetch: refetchTransferencias } =
    useTransferencia(+conta_id || 0)
  const [form, setForm] = useState({ conta: "", valor: "" })

  if (!conta_id) {
    return <p>Conta não encontrada</p>
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const conta = (form[0] as HTMLInputElement).value
    const valor = (form[1] as HTMLInputElement).value

    if (!conta || !valor) {
      alert("Preencha todos os campos")
      return
    }

    transaction(+conta_id, +conta, +valor)
      .then(() => {
        refetch()
        refetchTransferencias()
        alert("Transferência realizada com sucesso!")
      })
      .catch((error) => {
        console.error("Erro ao realizar a transferência:", error)
        alert("Erro ao realizar a transferência")
      })
  }

  return (
    <div className="text-zinc-50">
      <header className="flex flex-col gap-2 bg-emerald-800 p-4">
        <p className="text-md">BankSystem</p>
        <h2 className="text-3xl">{`Olá, ${data?.nome}!`}</h2>
      </header>
      <div className="flex flex-col gap-4 m-4">
        <h2 className="text-2xl">{`${conta?.numeroConta} - ${conta?.tipo}`}</h2>
        <p className="text-xl">{`Saldo disponível: ${formatCurrency(
          conta?.saldo || 0
        )}`}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-lg bg-zinc-600 max-w-80 rounded-md m-auto p-4"
      >
        <h2 className="text-2xl font-bold">Transferir</h2>
        <div className="flex gap-2 items-center">
          <label htmlFor="conta" className="w-44">
            Transferir para:
          </label>
          <input
            id="conta"
            type="text"
            placeholder="Número da conta"
            className="p-2 rounded-md text-zinc-900 w-full"
            value={form.conta}
            onChange={(e) => setForm({ ...form, conta: e.target.value })}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="" className="w-28">
            Valor:{" "}
          </label>
          <input
            type="number"
            placeholder="R$ 0,00"
            className="p-2 rounded-md text-zinc-900 w-full"
            value={form.valor}
            onChange={(e) => setForm({ ...form, valor: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-600 p-2 rounded-md w-2/5 m-auto mt-4"
        >
          Enviar
        </button>
      </form>

      <div>
        <p className="text-xl m-4">
          <strong>Histórico</strong>
        </p>
        {transferencias
          ?.sort((a, b) => +new Date(b.data) - +new Date(a.data))
          .map((transferencia) => (
            <div
              key={transferencia.id}
              className="bg-zinc-700 p-2 m-4 rounded-md flex justify-between"
            >
              <p>{`Transferência para a conta de ID ${
                transferencia.id_conta_destino
              } no valor de ${formatCurrency(transferencia.valor)}`}</p>
              <p>{`Data: ${new Date(transferencia.data).toLocaleString()}`}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
