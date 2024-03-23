import { createSlice } from '@reduxjs/toolkit'

const tripsSlice = createSlice({
	name: 'trips',
	initialState: {
		trips: []
	},
	reducers: {
		setTrips(state, action) {
			state.trips = action.payload
		}
	}
})

export const {
	setTrips
} = tripsSlice.actions
export default tripsSlice.reducer