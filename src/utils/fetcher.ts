import axios, { AxiosPromise } from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export const fetcher = <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: { params: any }
): AxiosPromise<T> => {
  const res = axios(`${API_URL}${url}`, params)
  return res
}
