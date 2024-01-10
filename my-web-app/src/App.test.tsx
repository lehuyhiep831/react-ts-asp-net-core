import { render, screen } from '@testing-library/react'
import { routes } from 'router/router'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { App } from './App'

describe('App', () => {
	test('renders user link', () => {
		render(<App />)
		const linkElement = screen.getByText(/Users/i)
		expect(linkElement).toBeInTheDocument()
	})

	test('renders Error page', () => {
		const router = createMemoryRouter(routes, {
			initialEntries: ['/unknown-route'],
		})
		render(<RouterProvider router={router}></RouterProvider>)
		const ErrorText = screen.getByText(/Sorry, an unexpected error has occurred./i)
		expect(ErrorText).toBeInTheDocument()
	})
})
