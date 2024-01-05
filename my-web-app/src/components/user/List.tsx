import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { User, getUsers } from '../../services/User.services'
import { Logo } from '_media'

export function List() {
	const [users, setUsers] = useState<User[]>()

	const location = useLocation()
	useEffect(() => {
		getUsers()
			.then((response) => {
				setUsers(response)
			})
			.catch((err) => {})
	}, [location])

	return (
		<div className="Page-container">
			<div className="Page-sidebar">
				<h4>User list</h4>{' '}
				<Link
					className="App-link"
					to={'/users/add'}
				>
					Add User
				</Link>
				{!users && <Logo></Logo>}
				{users?.map((user: User) => (
					<div key={user.id}>
						<Link
							className="App-link"
							to={`/users/${user.id}`}
						>
							{user.name}
						</Link>
					</div>
				))}
			</div>
			<div className="Page-content">
				<Outlet></Outlet>
			</div>
		</div>
	)
}
