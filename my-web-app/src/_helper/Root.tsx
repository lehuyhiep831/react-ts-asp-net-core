import { Link, Outlet } from 'react-router-dom'
import { Notification } from '../user'

export function Root() {
	return (
		<>
			<div className="App-header">
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
			</div>
			<div className="App-body">
				<Outlet />
			</div>
		</>
	)
}
