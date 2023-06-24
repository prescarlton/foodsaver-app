import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import * as SecureStore from "expo-secure-store"

enum StatusCode {
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export interface DefaultResponseData {
  message?: string
  data?: object
}

export interface DefaultError {
  data?: {
    error?: string
  }
}

const ApiBaseUrl = "http://localhost:5001/app"

const instance = axios.create({
  baseURL: ApiBaseUrl,
})

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error(error)
    if (!error?.config?.url?.includes("/refresh")) {
      return handleError(error)
    }
    return error
  },
)
instance.interceptors.request.use(async (req) => {
  // throw the auth token on that jawn
  const token = await SecureStore.getItemAsync("__clerk_client_jwt")
  req.headers.Authorization = `Bearer ${token}`
  return req
})

// Handle global app errors
// We can handle generic app errors depending on the status code
async function handleError(error: AxiosError) {
  const { response } = error

  switch (response?.status) {
    case StatusCode.InternalServerError: {
      // Handle InternalServerError
      break
    }
    case StatusCode.Forbidden: {
      // Handle Forbidden
      break
    }
    case StatusCode.Unauthorized: {
      // Handle Unauthorized
      break
    }
    case StatusCode.NotFound: {
      // Handle NotFound
      break
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      break
    }
  }

  return Promise.reject(error)
}

interface IApiServiceFactory {
  baseURL?: string
  interceptResponse?: (response: AxiosResponse) => AxiosResponse
  interceptRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig
}

interface ApiService {
  get: typeof instance.get
  post: typeof instance.post
  put: typeof instance.put
  delete: typeof instance.delete
  request: typeof instance.request
  buildURL: (url: string) => string
}

export function CreateApiService({
  baseURL = "",
  interceptResponse,
  interceptRequest,
}: IApiServiceFactory): ApiService {
  if (interceptRequest) {
    instance.interceptors.request.use((request) => {
      if (request.url?.indexOf(baseURL) === 0) {
        return interceptRequest(request)
      }
      return request
    })
  }
  if (interceptResponse) {
    instance.interceptors.response.use((response) => {
      if (response.config.url?.indexOf(baseURL) === 0) {
        return interceptResponse(response)
      }
      return response
    })
  }
  const buildURL = (url: string) => `${baseURL}${url}`
  return {
    get: <T = DefaultResponseData, R = AxiosResponse<T>>(
      url: string,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.get<T, R>(buildURL(url), config),
    post: <T = DefaultResponseData, R = AxiosResponse<T>, D = object>(
      url: string,
      data: D,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.post<T, R>(buildURL(url), data, config),
    put: <T = DefaultResponseData, R = AxiosResponse<T>, D = object>(
      url: string,
      data: D,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.put<T, R>(buildURL(url), data, config),
    delete: <T = DefaultResponseData, R = AxiosResponse<T>>(
      url: string,
      config: AxiosRequestConfig,
    ): Promise<R> => instance.delete<T, R>(buildURL(url), config),
    request: <T = DefaultResponseData, R = AxiosResponse<T>>(
      config: AxiosRequestConfig,
    ): Promise<R> => instance.request<T, R>(config),
    buildURL,
  }
}

export default ApiService
