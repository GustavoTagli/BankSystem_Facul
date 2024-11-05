"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cpf = (e.target as HTMLFormElement).cpf.value
    router.push("/" + cpf)
  }

  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center text-zinc-50">
      <h1 className="font-bold text-2xl">BankSystem</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-4 justify-center items-center bg-emerald-800 max-w-96 rounded-lg p-8 h-52"
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
    </div>
  )
}
