import { createSlice } from '@reduxjs/toolkit'
import { TOKEN } from '../../utils/constants'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		authorized: localStorage.getItem(TOKEN) ? true : false
	},
	reducers: {
		setAuthorized(state, action) {
			state.authorized = action.payload
		}
	}
})

export const {
	setAuthorized
} = authSlice.actions
export default authSlice.reducer