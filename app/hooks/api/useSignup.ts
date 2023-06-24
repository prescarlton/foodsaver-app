import UserService from "app/services/UserService"
import { useMutation } from "react-query"

interface SignupRequestBody {
  firstName: string
  lastName: string
  email: string
  phone: string
  clerkId: string
}

const signup = (data: SignupRequestBody) => {
  return UserService.post("/", data).then((res) => res.data.data)
}

const useSignup = () => {
  return useMutation(signup, {
    onError: (err) => {
      console.log("dam :(")
      console.error(err)
    },
  })
}
export default useSignup
