import './Button.scss'
import { Button } from 'antd'

function ButtonComponent({ onClick, type, title, htmlType }) {

	return (
		<Button
			type={type}
			className='button-antd'
			onClick={onClick}
			htmlType={htmlType}
		>
			{title}
		</Button>
	)
}

export default ButtonComponent