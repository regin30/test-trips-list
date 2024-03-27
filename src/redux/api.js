import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAuthorized } from './authService/authSlice'
import { TOKEN } from '../utils/constants'


export const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BASE_URL,
	prepareHeaders: (headers) => {
		const access = localStorage.getItem(TOKEN)

		if (access) {
			headers.set('authorization', `Bearer ${access}`)
		}
		return headers
	}
})

const baseQueryRequest = async (args, api, extraOptions) => {
	const { dispatch } = api

	try {
		let result = await baseQuery(args, api, extraOptions)

		if (result?.error?.status === 401) {
			dispatch(setAuthorized(false))
			localStorage.clear()
		}

		console.log(result)

		return result
	} catch (e) {
		console.log('basic api catch error', e)
	}
}

export const api= createApi({
	baseQuery: baseQueryRequest,
	// eslint-disable-next-line no-unused-vars
	endpoints: builder => ({})
})