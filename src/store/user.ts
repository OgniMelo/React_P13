import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState } from '../store'

interface UserState {
	logged?: boolean
	token?: string
	firstName?: string
	lastName?: string
}

const initialState: UserState = {
	logged: false,
	token: '',
	firstName: '',
	lastName: '',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState>) => {
			return { ...state, ...action.payload }
		},
	},
	extraReducers(builder) {
		builder.addCase(updateUser.fulfilled, (state, action) => {
			return { ...state, ...action.payload }
		})
	},
})

export const updateUser = createAsyncThunk('user/updateUser', async (payload: UserState) => {
	try {
		const { data } = await axios.put('/profile', { ...payload }, { headers: { Authorization: 'Bearer ' + payload.token } })
		return data.body
	} catch (error) {
		return
	}
})

export const { setUser } = userSlice.actions

export const selectFirstName = (state: RootState) => state.user.firstName
export const selectLaststName = (state: RootState) => state.user.lastName

export default userSlice.reducer
