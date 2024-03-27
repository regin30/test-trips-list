import './StatusFilter.scss'
import RadioButton from '../RadioButton/RadioButton'
import { Radio } from 'antd'

function StatusFilter({ onChange, value }) {

	return (
		<Radio.Group onChange={onChange} value={value} className='status-filter'>
			<RadioButton value={0} title={'Ожидание обработки'}/>
			<RadioButton value={1} title={'Обработка'}/>
			<RadioButton value={2} title={'Принято'}/>
			<RadioButton value={3} title={'Завершённый'}/>
			<RadioButton value={4} title={'Отменено без штрафа'}/>
			<RadioButton value={5} title={'Отменено со штрафом'}/>
			<RadioButton value={6} title={'Неоплаченный'}/>
			<RadioButton value={7} title={'Измененный'}/>
		</Radio.Group>
	)
}

export default StatusFilter