import { useAuth } from "@clerk/clerk-expo"
import { useQuery } from "react-query"

export default function useClerkQuery(url) {
  const { getToken } = useAuth()
  return useQuery(url, async () => {
    const token = await getToken()
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      throw new Error("Network response error")
    }
    return res.json()
  })
}
