import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { User, useAppDispatch, useAppSelector, userActions } from '_redux'
import { Logo } from 'components/common'

export function Edit() {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const user = useAppSelector((rootState) => rootState.user.item)

	const [formData, setFormData] = useState<User>()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [result, setResult] = useState<User>()

	useEffect(() => {
		try {
			dispatch(userActions.getUser(id))
				.unwrap()
				.then((user) => setFormData(user))
		} catch {
			navigate('/users/not-found')
		}
	}, [dispatch, id, navigate])

	function handleInputChange(e: any) {
		const { name, value } = e.target
		const newFormData = { ...formData, [name]: value } as User
		setFormData(newFormData)
	}

	async function onSubmit(e: any) {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			dispatch(userActions.editUser({ id: id, data: formData }))
				.unwrap()
				.then((response) => {
					setResult(response)
				})
		} catch (error) {
			// Handle error, show error message, etc.
		}

		setIsSubmitting(false)
	}
	console.log(formData)

	return (
		<>
			<div className="Page-title">
				<h4>Edit user</h4>
				<Link
					className="App-link"
					to={`/users/${id}`}
				>
					Cancel
				</Link>
			</div>

			{!(user?.loading ?? user?.error) && (
				<form onSubmit={onSubmit}>
					<label>
						Name:{' '}
						<input
							name="name"
							type="string"
							value={formData?.name}
							onChange={handleInputChange}
							min={0}
						></input>
					</label>
					<button
						disabled={isSubmitting}
						type="submit"
					>
						Save
					</button>
				</form>
			)}
			{(user?.loading ?? isSubmitting) && <Logo></Logo>}
			{user?.error && <div>Error loading user: {user.error.message}</div>}
			{result && (
				<div>
					User updated successfully!{' '}
					<Link
						className="App-link"
						to={`/users/${id}`}
					>
						See Detail
					</Link>
				</div>
			)}
		</>
	)
}
