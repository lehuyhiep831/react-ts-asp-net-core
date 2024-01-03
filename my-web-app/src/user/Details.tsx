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
					{`${user.name} are ${user.age} years old! `}
					<Link to={`/users/${user.id}/edit`}>Update?</Link>
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
					<Link to={`/users`}>Go back?</Link>{' '}
				</>
			)}{' '}
		</div>
	)
}
