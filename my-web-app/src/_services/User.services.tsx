import axios from 'axios'

export type User = {
	id: number
	name: string
	age: number
}
const controller = '/users'

export async function getUsers(): Promise<User[] | undefined> {
	const response = await axios.get(`${controller}`)

	return await response.data
}

export async function getUser(id: string): Promise<User> {
	const response = await axios.get(`${controller}/${id}`)

	return await response.data
}

export async function addUser(data: any): Promise<User> {
	const response = await axios.post(`${controller}`, data)

	return await response.data
}

export async function editUser(id: string, data: any): Promise<User> {
	const response = await axios.put(`${controller}/${id}`, data)

	return await response.data
}

export async function deleteUser(id: any): Promise<User> {
	const response = await axios.delete(`${controller}/${id}`)

	return await response.data
}

export async function addUserAsync(data: any): Promise<User> {
	const response = await axios.post(`${controller}/AddAsync`, data)

	return await response.data
}
