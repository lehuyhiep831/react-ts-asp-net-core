import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import { Dashboard } from '../home/Dashboard'
import { AddEdit, Details, List } from '../user'
import { ErrorPage } from './Errors'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: '/users',
				element: <List />,
				children: [
					{
						path: '/users/:id',
						element: <Details />,
					},
					{
						path: '/users/:id/edit',
						element: <AddEdit />,
					},
					{
						path: '/users/not-found',
						element: <ErrorPage />,
					},
				],
			},
			{
				path: '/users/add',
				element: <AddEdit />,
			},
		],
	},

	// {
	//   path: "*",
	//   element: <Navigate to={"/"} />,
	// },
])
