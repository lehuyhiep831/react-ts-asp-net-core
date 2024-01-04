import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '../errors/Errors'
import { Dashboard } from '../home/Dashboard'
import { Add, Details, Edit, List } from '../user'
import { Root } from './Root'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
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
						path: '/users/add',
						element: <Add />,
					},
					{
						path: '/users/:id',
						element: <Details />,
					},
					{
						path: '/users/:id/edit',
						element: <Edit />,
					},
					{
						path: '/users/not-found',
						element: <ErrorPage />,
					},
				],
			},
			{
				path: '/errors',
				element: <ErrorPage />,
			},
		],
	},

	// {
	//   path: "*",
	//   element: <Navigate to={"/"} />,
	// },
])
