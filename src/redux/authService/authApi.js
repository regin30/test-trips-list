import { api } from '../api'

export const authApi = api.injectEndpoints({
	reducerPath: 'loginApi',
	tagTypes: ['Login'],
	endpoints: builder => ({
		login: builder.mutation({
			query: (body) => ({
				url: '/v3/auth/login',
				method: 'POST',
				body
			})
		}),
		invalidatesTags: ['Login']
	})
})

export const { useLoginMutation } = authApi