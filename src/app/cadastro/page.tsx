"use client"

import { useCliente } from "@/hooks/useCliente"
import { useRouter } from "next/navigation"

export default function Cadastro() {
  const router = useRouter()
  const { createCliente } = useCliente()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const nome = (form[0] as HTMLInputElement).value
    const cpf = (form[1] as HTMLInputElement).value
    const dataNascimento = (form[2] as HTMLInputElement).value

    if (!nome || !cpf || !dataNascimento) {
      alert("Preencha todos os campos")
      return
    }

    createCliente({ nome, cpf, dataNascimento })
      .then(() => {
        alert("Cliente cadastrado com sucesso!")
        router.push("/")
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o cliente:", error)
        alert("Erro ao cadastrar o cliente")
      })
  }

  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center text-zinc-50">
      <h1 className="font-bold text-2xl">BankSystem</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center bg-emerald-800 max-w-96 rounded-lg p-8 h-64"
      >
        <h4 className="text-2xl font-semibold">Cadastro</h4>
        <div className="flex gap-2 justify-between items-center w-full">
          <label htmlFor="cpf">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            className="text-zinc-950 rounded-md p-1 outline-zinc-800"
          />
        </div>
        <div className="flex gap-2 justify-between items-center w-full">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            className="text-zinc-950 rounded-md p-1 outline-zinc-800"
          />
        </div>
        <div className="flex gap-2 justify-between items-center w-full">
          <label htmlFor="cpf">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            id="dataNascimento"
            className="text-zinc-950 rounded-md p-1 outline-zinc-800"
          />
        </div>
        <input
          type="submit"
          className="bg-zinc-800 p-1 w-24 rounded-md cursor-pointer"
        />
      </form>
    </div>
  )
}
