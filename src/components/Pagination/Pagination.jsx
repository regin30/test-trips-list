import './Pagination.scss'
import { Pagination } from 'antd'

const PaginationComponent = ({current, total, onChange }) => (
	<Pagination
		current={current}
		total={total}
		className='pagination-antd'
		onChange={onChange}
		showLessItems
	/>
)
export default PaginationComponent