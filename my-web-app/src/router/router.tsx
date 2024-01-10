import { RouteObject, createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '../components/errors/Errors'
import { Dashboard } from '../components/dashboard/Dashboard'
import { Add, Details, Edit, List } from '../components/user'
import { RootLayout } from './RootLayout'

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <RootLayout />,
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
]

export const router = createBrowserRouter(routes)
