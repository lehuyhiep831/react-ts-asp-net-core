import { HubConnectionBuilder, HttpTransportType, HubConnectionState } from '@microsoft/signalr'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Notification() {
	const [notification, setNotification] = useState<{ content: string; targetId: number }>()

	useEffect(() => {
		async function setUpSignalRConnection() {
			const connection = new HubConnectionBuilder()
				.withUrl('https://localhost:5000/ws/notification', {
					skipNegotiation: true,
					transport: HttpTransportType.WebSockets,
				})
				//.withAutomaticReconnect()
				.build()

			connection.on('NewNotification', (notification: any) => {
				//console.log('notification', notification)
				setNotification(notification)
			})

			connection.on('NotificationsHistory', (notifications: any) => {
				console.log('NotificationsHistory', notifications)
			})

			await connection
				.start()
				.then((response) => {
					//console.log(response)
				})
				.catch((err) => {
					//console.log(err)
				})

			if (connection.state === HubConnectionState.Connected) {
				//console.log('Connected')
			}

			return connection
		}
		setUpSignalRConnection()
	}, [])

	return (
		<div className="App-notification">
			{notification && (
				<>
					<div> {notification.content} </div>
					<Link
						className="App-link"
						to={`/users/${notification.targetId}`}
						onClick={() => setNotification(undefined)}
					>
						Check it out?
					</Link>
				</>
			)}
		</div>
	)
}
