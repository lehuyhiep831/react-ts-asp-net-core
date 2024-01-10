import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector, userActions } from '_redux'
import { Logo } from 'components/common'

export function List() {
	const users = useAppSelector((rootState) => rootState.user.list)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(userActions.getUsers())
	}, [dispatch])

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
				{!(users?.loading ?? users?.error) &&
					users?.value?.map((user) => (
						<div key={user.id}>
							<Link
								className="App-link"
								to={`/users/${user.id}`}
							>
								{user.name}
							</Link>
						</div>
					))}
				{users?.loading && <Logo></Logo>}
				{users?.error && <div>Error loading user: {users.error.message}</div>}
			</div>
			<div className="Page-content">
				<Outlet></Outlet>
			</div>
		</div>
	)
}
