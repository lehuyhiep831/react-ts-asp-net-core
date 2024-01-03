import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addUser, editUser, getUser } from '../_services'

type FormData = {
	name: string
	age: number
}
export function AddEdit() {
	const { id } = useParams()
	const navigate = useNavigate()

	const [formData, setFormData] = useState<FormData>({ name: '', age: 0 })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [result, setResult] = useState<{ id?: number; message?: string }>()

	useEffect(() => {
		if (id)
			getUser(id)
				.then((res) => {
					if (res) setFormData({ name: res.name, age: res.age })
				})
				.catch((err) => {
					if (err.status === 404) navigate('/users/not-found')
				})
	}, [id, navigate])

	function handleInputChange(e: any) {
		const { name, value } = e.target
		const newFormData = { ...formData, [name]: value }
		setFormData(newFormData)
	}

	async function onSubmit(e: any) {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			if (id) {
				const response = await editUser(id, formData)
				setResult(response)
			} else {
				const response = await addUser(formData)
				setResult(response)
			}
		} catch (error) {
			// Handle error, show error message, etc.
			console.log('Submission error:', error)
		}

		setIsSubmitting(false)
	}

	return (
		<div className="Page-container">
			<div className="Page-title">
				{id ? <h4>Change {formData.name} age</h4> : <h4>Add a user</h4>}
				<Link
					className="App-link"
					to={'/users'}
				>
					Back
				</Link>
			</div>
			<form onSubmit={onSubmit}>
				{!id ? (
					<label>
						Name:{' '}
						<input
							name="name"
							type="text"
							value={formData?.name}
							onChange={handleInputChange}
						></input>
					</label>
				) : null}
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
				<button
					disabled={isSubmitting}
					type="submit"
				>
					Save
				</button>
			</form>

			{result &&
				(result.id ? (
					<div>
						New user added successfully! <Link to={`/users/${result.id}`}>See Detail</Link>
					</div>
				) : (
					<div>
						Update successfully! <Link to={`/users/${id}`}>return ?</Link>
					</div>
				))}
		</div>
	)
}
