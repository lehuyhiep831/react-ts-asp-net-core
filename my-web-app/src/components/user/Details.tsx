import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector, userActions } from '_redux'
import { Logo } from 'components/common'

export function Details() {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const user = useAppSelector((rootState) => rootState.user.item)

	useEffect(() => {
		try {
			dispatch(userActions.getUser(id))
		} catch {
			navigate('/users/not-found')
		}
	}, [dispatch, id, navigate])

	async function onRemove() {
		try {
			dispatch(userActions.deleteUser(id))
				.unwrap()
				.then((_) => {
					navigate('/users')
				})
		} catch {
			navigate('/users/not-found')
		}
	}

	return (
		<div>
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
			{!(user?.loading && user?.error) && (
				<>
					<label>This is {`${user?.value?.name}`}</label>

					<button onClick={() => navigate(`/users/${id}/edit`)}>Update</button>

					<button
						type="button"
						onClick={onRemove}
					>
						Remove
					</button>
				</>
			)}
			{user?.loading && <Logo></Logo>}
			{user?.error && <div>Error loading user: {user.error.message}</div>}
		</div>
	)
}
