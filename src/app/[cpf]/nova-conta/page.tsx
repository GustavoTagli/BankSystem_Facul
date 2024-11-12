"use client"

import { useConta } from "@/hooks/useConta"
import { useRouter } from "next/navigation"
import { use } from "react"

export default function NovaConta({
  params,
}: {
  params: Promise<{ cpf: string }>
}) {
  const { cpf } = use(params)
  const { createConta } = useConta()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const numeroConta = form.numeroConta.value
    const tipo = form.tipo.value

    if (!numeroConta || !tipo) {
      alert("Preencha todos os campos")
      return
    }

    createConta(cpf, numeroConta, tipo)
      .then(() => {
        alert("Conta criada com sucesso")
        router.push(`/${cpf}`)
      })
      .catch((error) => {
        console.error("Erro ao criar conta:", error)
        alert("Erro ao criar conta")
      })
  }

  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center text-zinc-50">
      <h1 className="font-bold text-2xl">BankSystem</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center bg-emerald-800 max-w-96 rounded-lg p-8 h-64"
      >
        <h4 className="text-2xl font-semibold">Abrir conta</h4>
        <div className="flex gap-2 justify-between items-center w-full">
          <label htmlFor="cpf">Numero da conta</label>
          <input
            type="text"
            name="numeroConta"
            id="numeroConta"
            className="text-zinc-950 rounded-md p-1 outline-zinc-800"
          />
        </div>
        <div className="flex gap-2 justify-between items-center w-full">
          <label htmlFor="cpf">Tipo</label>
          <select
            name="tipo"
            id="tipo"
            className="text-zinc-950 rounded-md p-1 outline-zinc-800"
          >
            <option value="Corrente">Corrente</option>
            <option value="Poupanca">Poupança</option>
          </select>
        </div>
        <input
          type="submit"
          className="bg-zinc-800 p-1 w-24 rounded-md cursor-pointer"
        />
      </form>
    </div>
  )
}
