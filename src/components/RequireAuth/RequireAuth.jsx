import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/selectors'

const RequireAuth = () => {
	const auth = useSelector(selectAuth)

	return (
		<>
			{auth ?
				<Outlet />
				: <Navigate to={'/login'} />
			}
		</>
	)
}

export default RequireAuth