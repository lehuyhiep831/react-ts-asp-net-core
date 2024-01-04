import axios, { AxiosError } from 'axios'
import { redirect } from 'react-router-dom'

// Add a request interceptor
axios.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		config.baseURL = 'https://localhost:5000'
		return config
	},
	function (error) {
		// Do something with request error

		return Promise.reject(error)
	}
)

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data

		return response
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		return Promise.reject(error.response)
	}
)

export * from './User.services'
