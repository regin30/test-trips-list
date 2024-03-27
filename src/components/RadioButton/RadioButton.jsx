import './RadioButton.scss'
import { Radio } from 'antd'

function RadioButton({ value, title }) {

	return (
		<Radio
			value={value}
			className='radio-button-antd'
		>
			{title}
		</Radio>
	)
}

export default RadioButton