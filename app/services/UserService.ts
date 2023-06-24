import { CreateApiService } from "./Service"

const UserService = CreateApiService({
  baseURL: "/users",
})

export default UserService
