import { useAuth } from "@clerk/clerk-expo"
import UserService from "../../services/UserService"
import { useQuery } from "react-query"

const ME_QUERY_KEY = ["me"]

const getMe = async (token: string) => {
  return UserService.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.data.data)
}

const useGetMe = async () => {
  const { getToken } = useAuth()
  const token = await getToken()
  return useQuery(ME_QUERY_KEY, () => getMe(token))
}

export default useGetMe
