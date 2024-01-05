import { HubConnectionBuilder, HttpTransportType, HubConnectionState } from '@microsoft/signalr'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type NotificationData = {
	content: string
	targetId: number
}

export function Notification() {
	const [notification, setNotification] = useState<NotificationData>()

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
				connection.invoke('SendNotification', { content: 'A user connected', targetId: 0 })
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
					{notification.targetId !== 0 ? (
						<Link
							className="App-link"
							to={`/users/${notification.targetId}`}
							onClick={() => setNotification(undefined)}
						>
							Check it out?
						</Link>
					) : (
						<div
							className="App-link"
							onClick={() => setNotification(undefined)}
						>
							Ok bro!
						</div>
					)}
				</>
			)}
		</div>
	)
}
