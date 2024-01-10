import { useState } from 'react'
import { Link } from 'react-router-dom'

import { User, useAppDispatch, userActions } from '_redux'
import { Logo } from 'components/common'

export function Add() {
	const dispatch = useAppDispatch()

	const [formData, setFormData] = useState<User>()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [result, setResult] = useState<User | undefined>()

	function handleInputChange(e: any) {
		const { name, value } = e.target
		const newFormData = { ...formData, [name]: value } as User
		setFormData(newFormData)
	}

	async function onSubmit(e: any) {
		e.preventDefault()
		setIsSubmitting(true)
		setResult(undefined)

		try {
			await dispatch(userActions.addUser(formData))
				.unwrap()
				.then((response) => {
					setResult(response)
					dispatch(userActions.getUsers())
				})
		} catch (error) {
			// Handle error, show error message, etc.
		}

		setIsSubmitting(false)
	}

	return (
		<>
			<div className="Page-title">
				<h4>Add a user</h4>
				<Link
					className="App-link"
					to={'/users'}
				>
					Back
				</Link>
			</div>

			<form onSubmit={onSubmit}>
				<label>
					Name:{' '}
					<input
						name="name"
						type="text"
						value={formData?.name ?? ''}
						onChange={handleInputChange}
					></input>
				</label>

				<div className="App-button-group">
					<button
						disabled={isSubmitting}
						type="submit"
					>
						Save
					</button>
				</div>
			</form>

			{isSubmitting && <Logo></Logo>}
			{result && (
				<div>
					New user added successfully!{' '}
					<Link
						className="App-link"
						to={`/users/${result.id}`}
					>
						See Detail
					</Link>
				</div>
			)}
		</>
	)
}
