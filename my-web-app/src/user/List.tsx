import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { User, getUsers } from '../_services'

export function List() {
	const [users, setUsers] = useState<User[]>()
	const location = useLocation()
	useEffect(() => {
		console.log('get new data')

		getUsers()
			.then((response) => {
				setUsers(response)
			})
			.catch((err) => {})
	}, [location])

	return (
		<div className="Page-container">
			<div className="Page-title">
				<h4>User list</h4>{' '}
				<Link
					className="App-link"
					to={'/users/add'}
				>
					Add User
				</Link>
			</div>

			{users?.map((user: User) => (
				<div key={user.id}>
					<Link to={`/users/${user.id}`}>{user.name}</Link>
				</div>
			))}
			<Outlet></Outlet>
		</div>
	)
}