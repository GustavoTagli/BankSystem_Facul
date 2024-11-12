"use client"

import Loader from "@/components/loader"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <Loader />
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cpf = (e.target as HTMLFormElement).cpf.value
    router.push("/" + cpf)
  }

  const handleClickCadastro = () => {
    router.push("/cadastro")
  }

  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center text-zinc-50">
      <h1 className="font-bold text-2xl">BankSystem</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center bg-emerald-800 max-w-96 rounded-lg p-8 h-56"
      >
        <h4 className="text-2xl font-semibold">Login</h4>
        <div className="flex gap-2 items-center">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            className="text-zinc-950 rounded-md p-1 outline-zinc-800"
          />
        </div>
        <input
          type="submit"
          className="bg-zinc-800 p-1 w-24 rounded-md cursor-pointer"
        />
      </form>
      <button
        onClick={handleClickCadastro}
        className="text-sm underline p-0 m-0"
      >
        Cadastrar
      </button>
    </div>
  )
}
