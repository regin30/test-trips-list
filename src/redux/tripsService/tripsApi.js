import { api } from '../api'

export const tripsApi = api.injectEndpoints({
	reducerPath: 'tripsApi',
	tagTypes: ['Trips'],
	endpoints: builder => ({
		getTrips: builder.query({
			query: (queryParams = {}) => {
				const queryString = new URLSearchParams(queryParams).toString()
				return {
					url: `/v3/orders/trips?${queryString}`,
					method: 'GET',
				}
			}
		}),
		invalidatesTags: ['Trips']
	})
})

export const { useGetTripsQuery } = tripsApi