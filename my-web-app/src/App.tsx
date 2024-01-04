import { Link, Outlet } from 'react-router-dom'
import './App.css'
import { Notification } from './user'

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
				<Notification></Notification>
			</header>
			<div className="App-body">
				<Outlet />
			</div>
		</div>
	)
}

export default App
