import axios from 'axios'
import { RouterProvider } from 'react-router-dom'

import { router } from '_helper/Router'
import './App.css'

export function App() {
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
			if (error.response) return Promise.reject(error.response)
		}
	)

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	)
}
