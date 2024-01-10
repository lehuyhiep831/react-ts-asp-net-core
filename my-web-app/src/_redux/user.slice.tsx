import {
	ActionReducerMapBuilder,
	PayloadAction,
	SerializedError,
	createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

import { createAppAsyncThunk } from './customHooks'

//TODO: define data type for the value of redux slice state
export type User = {
	id: number
	name: string
	age: number
}
//TODO: define data type redux slice state
type UserState = {
	list?: { value?: User[]; loading?: boolean; error?: SerializedError }
	item?: { value?: User; loading?: boolean; error?: SerializedError }
}

const name = 'users'
const initialState = createInitialState()
const extraActions = createExtraActions()
const reducers = createReducers()
const extraReducers = createExtraReducers()

// exports
export const userSlice = createSlice({
	name,
	initialState,
	reducers,
	extraReducers,
})

export const userActions = { ...userSlice.actions, ...extraActions }
export const userReducer = userSlice.reducer

//implementation
function createInitialState(): UserState {
	return { list: undefined, item: undefined }
}

function createReducers() {
	return { setUsers }
	//TODO: define  synchronous actions (setData, resetData,...)

	function setUsers(state: UserState, action: PayloadAction<User[]>) {
		state.list = { value: action.payload }
	}
}

function createExtraActions() {
	return {
		getUsers: getUsers(),
		getUser: getUser(),
		addUser: addUser(),
		editUser: editUser(),
		deleteUser: deleteUser(),
	}
	//TODO: define asynchronous actions (API calls,...)
	function getUsers() {
		return createAppAsyncThunk<User[]>(`${name}/getUsers`, async () => {
			const response = await axios.get(`${name}`)

			return await response.data
		})
	}

	function getUser() {
		// with createAppAsyncThunk<User, any> return type  is  User and params type is any
		return createAppAsyncThunk<User, any>(`${name}/getUser`, async (id) => {
			const response = await axios.get(`${name}/${id}`)
			return await response.data
		})
	}

	function addUser() {
		return createAppAsyncThunk<User, any>(`${name}/addUser`, async (data) => {
			const response = await axios.post(`${name}`, data)
			return await response.data
		})
	}

	function editUser() {
		return createAppAsyncThunk<any, any>(`${name}/editUser`, async ({ id, data }) => {
			const response = await axios.put(`${name}/${id}`, data)

			return await response.data
		})
	}

	function deleteUser() {
		return createAppAsyncThunk<User, any>(`${name}/deleteUser`, async (id: string) => {
			const response = await axios.delete(`${name}/${id}`)

			return await response.data
		})
	}
}

function createExtraReducers() {
	return (builder: ActionReducerMapBuilder<UserState>) => {
		getUsers()
		getUser()
		addUser()
		editUser()
		deleteUser()

		//TODO: handle { pending, fulfilled, rejected } state of asynchronous actions
		function getUsers() {
			const { pending, fulfilled, rejected } = extraActions.getUsers
			builder
				.addCase(pending, (state) => {
					state.list = { loading: true }
				})
				.addCase(fulfilled, (state, action) => {
					state.list = { value: action.payload }
				})
				.addCase(rejected, (state, action) => {
					state.list = { error: action.error }
				})
		}

		function getUser() {
			const { pending, fulfilled, rejected } = extraActions.getUser
			builder
				.addCase(pending, (state) => {
					state.item = { loading: true }
				})
				.addCase(fulfilled, (state, action) => {
					state.item = { value: action.payload }
				})
				.addCase(rejected, (state, action) => {
					state.item = { error: action.error }
				})
		}

		function addUser() {
			const { fulfilled } = extraActions.addUser
			builder.addCase(fulfilled, (state, action) => {
				console.log(action.payload)
			})
		}

		function editUser() {
			const { fulfilled, rejected } = extraActions.editUser
			builder
				.addCase(fulfilled, (state, action) => {
					console.log(action.payload)
				})
				.addCase(rejected, (state, action) => {
					state.item = { error: action.error }
				})
		}

		function deleteUser() {
			const { fulfilled, rejected } = extraActions.deleteUser
			builder
				.addCase(fulfilled, (state, action) => {
					if (state.list?.value)
						state.list.value = state.list.value.filter((x) => x.id.toString() !== action.meta.arg)
				})
				.addCase(rejected, (state, action) => {
					state.item = { error: action.error }
				})
		}
	}
}
