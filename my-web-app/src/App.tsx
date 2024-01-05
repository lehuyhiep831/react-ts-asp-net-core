import axios from 'axios'
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

import { Root } from '_helper/Root'
import { ErrorPage } from 'components/errors/Errors'
import { Dashboard } from 'components/home/Dashboard'
import './App.css'
import { List } from 'components/user'
import { router } from '_helper/Router'

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
			<RouterProvider router={router}></RouterProvider>
			{/* <BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Root></Root>}
					>
						<Route
							index
							element={<Dashboard></Dashboard>}
						></Route>
					</Route>
					<Route
						path="/users"
						element={<List></List>}
					></Route>
					<Route
						path="*"
						element={<ErrorPage></ErrorPage>}
					></Route>
				</Routes>
			</BrowserRouter> */}
		</div>
	)
}
