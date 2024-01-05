import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { User, editUser, getUser } from '../../services/User.services'

type FormData = {
	name: string
	age: number
}
export function Edit() {
	const { id } = useParams()
	const navigate = useNavigate()

	const [formData, setFormData] = useState<FormData>({ name: '', age: 0 })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [result, setResult] = useState<User>()

	useEffect(() => {
		if (id)
			getUser(id)
				.then((res) => {
					setFormData({ name: res.name, age: res.age })
				})
				.catch((err) => {
					// user not found !?!
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
			}
		} catch (error) {
			// Handle error, show error message, etc.
		}

		setIsSubmitting(false)
	}

	return (
		<>
			<div className="Page-title">
				<h4>Edit a user</h4>
				<Link
					className="App-link"
					to={`/users/${id}`}
				>
					Cancel
				</Link>
			</div>
			<form onSubmit={onSubmit}>
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

			{result && (
				<>
					Update successfully!{' '}
					<Link
						className="App-link"
						to={`/users/${id}`}
					>
						{' '}
						Check it out?
					</Link>
				</>
			)}
		</>
	)
}
