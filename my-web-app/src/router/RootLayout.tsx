import { Link, Outlet } from 'react-router-dom'

import { Notification } from 'components'

export function RootLayout() {
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
				<Link
					className="App-link"
					to="/roles"
				>
					Roles
				</Link>
				{/* <Notification></Notification> */}
			</div>
			<div className="App-body">
				<Outlet />
			</div>
		</>
	)
}
