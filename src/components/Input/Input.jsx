import './Input.scss'
import { useState } from 'react'
import { Input } from 'antd'

function InputComponent({ type, placeholder, error, value, onChange, maxLength, name }) {
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<div className='input__wrapper'>
			{
				type !== 'password' ?
					<Input
						className='input-antd'
						status={error ? error.status : ''}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						maxLength={maxLength ? maxLength : '64'}
						name={name}
					/>
					:
					<Input.Password
						name={name}
						className='input-antd'
						placeholder={placeholder}
						status={error ? error.status : ''}
						value={value}
						onChange={onChange}
						maxLength={maxLength ? maxLength : '64'}
						visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
					/>
			}

			{
				error && error.text &&
				<p className='input-error'>{error ? error.text : ''}</p>
			}
		</div>
	)
}

export default InputComponent