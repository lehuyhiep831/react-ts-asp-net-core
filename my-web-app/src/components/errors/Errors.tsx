import { Link } from 'react-router-dom'

export function ErrorPage() {
	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>{`Sorry, an unexpected error has occurred.`}</p>
			<Link
				className="App-link"
				to={'/'}
			>
				Return
			</Link>
		</div>
	)
}
