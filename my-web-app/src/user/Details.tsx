import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { User, deleteUser, getUser } from '../_services'

export function Details() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [user, setUser] = useState<User>()
	useEffect(() => {
		if (id)
			getUser(id)
				.then((res) => {
					setUser(res)
				})
				.catch((err) => {
					console.log(err)

					if (err.status === 404) navigate('/users/not-found')
				})
	}, [id, navigate])

	async function onRemove() {
		if (id)
			await deleteUser(id).then(() => {
				setUser(undefined)
			})
	}

	return (
		<div>
			{user ? (
				<>
					<div className="Page-title">
						<h4>User details</h4>
						<h4>
							<Link
								className="App-link"
								to={`/users`}
							>
								Back
							</Link>
						</h4>
					</div>
					{`${user.name} are ${user.age} years old! `}
					<button onClick={() => navigate(`/users/${user.id}/edit`)}>Update?</button>
					{`or`}
					<button
						type="button"
						onClick={onRemove}
					>
						Remove
					</button>
					{`?`}
				</>
			) : (
				<>
					{`Ops! user not found`}
					<Link
						className="App-link"
						to={`/users`}
					>
						Go back?
					</Link>{' '}
				</>
			)}{' '}
		</div>
	)
}
