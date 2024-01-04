import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import { Dashboard } from '../home/Dashboard'
import { Add, Details, Edit, List } from '../user'
import { ErrorPage } from '../errors/Errors'

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
