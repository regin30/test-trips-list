import { STYLE_PRIMARY } from '../../utils/constants'
import './Button.scss'
import { Button } from 'antd'

function ButtonComponent({ onClick, type, title, htmlType }) {

	return (
		<Button
			type={type}
			className={`button-antd ${type !== STYLE_PRIMARY ? 'default-button' : ''}`}
			onClick={onClick}
			htmlType={htmlType}
		>
			{title}
		</Button>
	)
}

export default ButtonComponent