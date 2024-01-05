import { render, screen } from '@testing-library/react'
import { routesConfig } from '_helper/Router'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { App } from './App'

describe('App', () => {
	test('renders user link', () => {
		render(<App />)
		const linkElement = screen.getByText(/Users/i)
		expect(linkElement).toBeInTheDocument()
	})

	test('renders Error page', () => {
		const router = createMemoryRouter(routesConfig, {
			initialEntries: ['/oops'],
		})
		render(<RouterProvider router={router}></RouterProvider>)
		const ErrorText = screen.getByText(/Sorry, an unexpected error has occurred./i)
		expect(ErrorText).toBeInTheDocument()
	})
})
