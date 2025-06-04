import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

const cleanParams = (params: Record<string, unknown> = {}) => {
	return Object.entries(params).reduce(
		(acc, [key, value]) => {
			if (value !== null && value !== undefined && value !== '' && value !== false) {
				acc[key] = value
			}
			return acc
		},
		{} as Record<string, unknown>
	)
}

const formatUrlWithParams = (url: string, pathParams: Record<string, unknown> = {}) => {
	return url.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
		const value = pathParams[key]
		if (value === undefined || value === null) {
			throw new Error(`Parâmetro de rota "${key}" não fornecido`)
		}
		return encodeURIComponent(String(value))
	})
}

export const CreateClient = (baseURL: string) => {
	const api: AxiosInstance = axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	// Interceptor para adicionar token
	api.interceptors.request.use(
		config => {
			const token = localStorage.getItem('authToken')
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		},
		error => Promise.reject(error)
	)

	api.interceptors.response.use(
		response => response,
		error => {
			if (error.response?.status === 401) {
				window.location.href = '/'
			}
			return Promise.reject(error)
		}
	)

	const Methods = {
		get: async (
			url: string,
			{
				pathParams = {},
				params = {},
				config = {},
			}: {
				pathParams?: Record<string, unknown>
				params?: Record<string, unknown>
				config?: AxiosRequestConfig
			} = {}
		): Promise<AxiosResponse> => {
			const cleanedParams = cleanParams(params)
			const formattedUrl = formatUrlWithParams(url, pathParams)
			return api.get(formattedUrl, { ...config, params: cleanedParams })
		},

		post: async (
			url: string,
			data?: unknown,
			{
				pathParams = {},
				params = {},
				config = {},
			}: {
				pathParams?: Record<string, unknown>
				params?: Record<string, unknown>
				config?: AxiosRequestConfig
			} = {}
		): Promise<AxiosResponse> => {
			const cleanedParams = cleanParams(params)
			const formattedUrl = formatUrlWithParams(url, pathParams)
			return api.post(formattedUrl, data, { ...config, params: cleanedParams })
		},

		put: async (
			url: string,
			data?: unknown,
			{
				pathParams = {},
				params = {},
				config = {},
			}: {
				pathParams?: Record<string, unknown>
				params?: Record<string, unknown>
				config?: AxiosRequestConfig
			} = {}
		): Promise<AxiosResponse> => {
			const cleanedParams = cleanParams(params)
			const formattedUrl = formatUrlWithParams(url, pathParams)
			return api.put(formattedUrl, data, { ...config, params: cleanedParams })
		},

		delete: async (
			url: string,
			{
				pathParams = {},
				params = {},
				config = {},
			}: {
				pathParams?: Record<string, unknown>
				params?: Record<string, unknown>
				config?: AxiosRequestConfig
			} = {}
		): Promise<AxiosResponse> => {
			const cleanedParams = cleanParams(params)
			const formattedUrl = formatUrlWithParams(url, pathParams)
			return api.delete(formattedUrl, { ...config, params: cleanedParams })
		},

		getFile: async (
			url: string,
			{
				pathParams = {},
				params = {},
				config = {},
			}: {
				pathParams?: Record<string, unknown>
				params?: Record<string, unknown>
				config?: AxiosRequestConfig
			} = {}
		): Promise<AxiosResponse> => {
			const cleanedParams = cleanParams(params)
			const formattedUrl = formatUrlWithParams(url, pathParams)
			return api.get(formattedUrl, { ...config, params: cleanedParams, responseType: 'blob' })
		},
	}

	return { ...Methods, api }
}
