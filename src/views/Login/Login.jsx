import './Login.scss'
import { Formik, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useLoginMutation } from '../../redux/authService/authApi'
import { setAuthorized } from '../../redux/authService/authSlice'
import {
	STYLE_PRIMARY, TYPE_SUBMIT, LOGIN, PASSWORD, TOKEN, TYPE_TEXT } from '../../utils/constants'

function Login() {
	const [logIn] = useLoginMutation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function validateLogin(value, setFieldError) {
		const checkedValue = value.replace(' ', '')

		if (checkedValue.length < 1) {
			setFieldError(LOGIN, 'Введите логин')
			return true
		}
	}

	function validatePassword(value, setFieldError) {
		const checkedValue = value.replace(' ', '')

		if (checkedValue.length < 1) {
			setFieldError(PASSWORD, 'Введите пароль')
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
			localStorage.setItem(TOKEN, response.result.token)

			navigate('/')
		} catch (e) {
			if (e.status === 400) {
				setFieldError(PASSWORD, 'Неверный пароль')
				setFieldError(LOGIN, 'Неверный логин')
			}

			console.log('Login catch error', e)
		}
	}

	return (
		<div className='login__container'>
			<div className='login__form-container'>

				<Formik
					initialValues={{
						login: '',
						password: '',
					}}
					onSubmit={async (values, { setFieldError }) => loginSystem(values, setFieldError)}
				>
					{({ values, errors, handleSubmit, handleChange }) => (
						<form onSubmit={handleSubmit} noValidate>
							<Field
								as={Input}
								type={TYPE_TEXT}
								onChange={handleChange}
								value={values.login}
								placeholder={LOGIN}
								required={true}
								error={getError(errors.login)}
								name={LOGIN}
							/>

							<Field
								as={Input}
								type={PASSWORD}
								onChange={handleChange}
								value={values.password}
								placeholder={'Пароль'}
								required={true}
								error={getError(errors.password)}
								name={PASSWORD}
							/>

							<Button
								title={'Войти'}
								type={STYLE_PRIMARY}
								htmlType={TYPE_SUBMIT}
							/>
						</form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default Login