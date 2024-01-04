import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from './../logo.svg'
import { User, addUser, addUserAsync } from '../_services/User.services'

type FormData = {
	name: string
	age: number
}
export function Add() {
	const [formData, setFormData] = useState<FormData>({ name: '', age: 0 })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [result, setResult] = useState<User>()

	function handleInputChange(e: any) {
		const { name, value } = e.target
		const newFormData = { ...formData, [name]: value }
		setFormData(newFormData)
	}

	async function onSubmit(e: any) {
		e.preventDefault()
		setIsSubmitting(true)
		setResult(undefined)

		try {
			const response = await addUser(formData)
			setResult(response)
		} catch (error) {
			// Handle error, show error message, etc.
		}

		setIsSubmitting(false)
	}

	async function onSubmitAsync(e: any) {
		e.preventDefault()
		setIsSubmitting(true)
		setResult(undefined)

		try {
			const response = await addUserAsync(formData)
			setResult(response)
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
						value={formData?.name}
						onChange={handleInputChange}
					></input>
				</label>

				<label>
					Age:{' '}
					<input
						name="age"
						type="number"
						value={formData?.age}
						onChange={handleInputChange}
						min={0}
					></input>
				</label>
				<div className="App-button-group">
					<button
						disabled={isSubmitting}
						type="submit"
					>
						Save
					</button>

					<button
						disabled={isSubmitting}
						type="button"
						onClick={onSubmitAsync}
					>
						Save (But take more time)
					</button>
				</div>
			</form>

			{isSubmitting && (
				<img
					src={logo}
					className="App-logo"
					alt="logo"
				/>
			)}
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
