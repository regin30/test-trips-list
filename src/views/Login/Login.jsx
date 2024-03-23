import './Login.scss'
import { Formik, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useLoginMutation } from '../../redux/authService/authApi'
import { setAuthorized } from '../../redux/authService/authSlice'

function Login() {
	const [logIn] = useLoginMutation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function validateLogin(value, setFieldError) {
		const checkedValue = value.replace(' ', '')

		if (checkedValue.length < 1) {
			setFieldError('login', 'Введите логин')
			return true
		}
	}

	function validatePassword(value, setFieldError) {
		const checkedValue = value.replace(' ', '')

		if (checkedValue.length < 1) {
			setFieldError('password', 'Введите пароль')
			return true
		}
	}

	function getError(error) {
		if (error) {
			return { text: error, status: 'error' }
		} else {
			return { text: '', status: '' }
		}
	}

	function validate(login, password, setFieldError) {
		const loginError = validateLogin(login, setFieldError)
		const passwordError = validatePassword(password, setFieldError)

		if (loginError || passwordError) {
			return false
		} else {
			return true
		}
	}

	function resetErrors(resetLoginErr, resetPassworErr) {
		resetLoginErr('login', '')
		resetPassworErr('password', '')
	}

	async function loginSystem(values, setFieldError) {
		const { login, password } = values
		const trimmedLogin = login.trim()
		const trimmedPassword = password.trim()

		const isValid = validate(trimmedLogin, trimmedPassword, setFieldError)

		if (!isValid) return

		try {
			let body = { login: trimmedLogin, password: trimmedPassword }

			const response = await logIn(body).unwrap()

			if (response?.error) {
				console.log(response.error)
				return
			}

			dispatch(setAuthorized(true))
			localStorage.setItem('token', response.result.token)

			navigate('/')
		} catch (e) {
			if (e.status === 400) {
				setFieldError('password', 'Неверный пароль')
				setFieldError('login', 'Неверный логин')
			}

			console.log('Login catch error', e)
		}
	}

	return (
		<div className="login__container">
			<div className="login__form-container">

				<Formik
					initialValues={{
						login: '',
						password: '',
					}}
					onSubmit={async (values, { setFieldError }) => loginSystem(values, setFieldError)}
				>
					{({ values, errors, handleSubmit, handleChange, setFieldError }) => (
						<form onSubmit={handleSubmit} noValidate>
							<Field
								as={Input}
								type="text"
								onChange={handleChange}
								value={values.login}
								placeholder="Логин"
								required={true}
								error={getError(errors.login)}
								name="login"
								onClick={() => resetErrors(setFieldError, setFieldError)}
							/>

							<Field
								as={Input}
								type="password"
								onChange={handleChange}
								value={values.password}
								placeholder="Пароль"
								required={true}
								error={getError(errors.password)}
								name="password"
								onClick={() => resetErrors(setFieldError, setFieldError)}
							/>

							<Button
								title='Войти'
								type={'primary'}
								htmlType={'submit'}
							/>
						</form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default Login