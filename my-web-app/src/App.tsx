import React from 'react'

import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Link
					className="App-link"
					to="/"
				>
					Dashboard
				</Link>

				<Link
					className="App-link"
					to="/users"
				>
					Users
				</Link>
			</header>
			<div className="App-body">
				<Outlet />
			</div>
		</div>
	)
}

export default App
