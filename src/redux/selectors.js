import { createSelector } from '@reduxjs/toolkit'

export const selectAuth = state => state.auth.authorized
export const selectTrips = state => state.trips.trips

export const selectData = createSelector(
	[
		selectAuth,
		selectTrips
	],
	(data) => {
		return data
	}
)