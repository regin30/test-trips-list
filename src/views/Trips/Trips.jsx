import './Trips.scss'
import { useGetTripsQuery } from '../../redux/tripsService/tripsApi'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuthorized } from '../../redux/authService/authSlice'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { ReactComponent as Arrow } from '../../assets/arrow_down.svg'
import { ReactComponent as Logout } from '../../assets/logout.svg'
import SmoothCollapse from 'react-smooth-collapse'
import StatusFilter from '../../components/StatusFilter/StatusFilter'
import PaginationComponent from '../../components/Pagination/Pagination'
import { STYLE_PRIMARY, TYPE_BUTTON, TYPE_TEXT } from '../../utils/constants'

const Trips = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [requestParameters, setRequestParameters] = useState({})
	const [clickedRowIndex, setClickedRowIndex] = useState('')
	const [searchValue, setSearchValue] = useState('')
	const [statusFilter, setStatusFilter] = useState('')
	const [showStatusFIlter, setShowStatusFilter] = useState(false)
	const [page, setPage] = useState(1)

	const { data = {}, isLoading, error, status } = useGetTripsQuery(
		{ ...requestParameters, page }
	)
	const pageAmount = data.result ? data.result.page_data.page_count : 0

	function buildParameters(status) {
		let parameters = {}
		let queryKey = ''

		if (searchValue.includes('@')) {
			queryKey = 'email'
		} else {
			queryKey = 'names'
		}

		if (queryKey && searchValue) {
			parameters = { [queryKey]: searchValue }
		}

		if (status) {
			parameters = {
				...parameters,
				order_status: status
			}
		}

		setRequestParameters(parameters)
	}

	function handleIndexOfShowedInfo(index) {
		if (index === clickedRowIndex) {
			setClickedRowIndex('')
		} else {
			setClickedRowIndex(index)
		}
	}

	function handleOnChangeSearch(value) {
		setSearchValue(value)
	}

	function handleSearchButton() {
		buildParameters(statusFilter)
	}

	function handleChangeStatusFilter(value) {
		setStatusFilter(value)
		buildParameters(value)
	}

	function resetStatusFilter() {
		setSearchValue('')
		setShowStatusFilter(false)
	}

	function logOut() {
		localStorage.clear()
		dispatch(setAuthorized(false))
		navigate('/login')
	}

	if (isLoading) return <div className='plug'>Загрузка</div>
	if (error) return <div className='plug'>Сервис недоступен</div>

	return (
		<div className='trips__wrapper'>
			<div className='trips__header'>
				<button
					onClick={logOut}
					type={TYPE_BUTTON}
					className='trips__header-button'
				>
					<Logout />
				</button>
			</div>

			<div className='trips__search'>
				<Input
					placeholder={'Поиск по имени/почте'}
					value={searchValue}
					onChange={(e) => handleOnChangeSearch(e.target.value)}
					type={TYPE_TEXT}
				/>

				<Button
					type={STYLE_PRIMARY}
					title={'Найти'}
					htmlType={TYPE_BUTTON}
					onClick={handleSearchButton}
				/>
			</div>

			<div className='trips__status-filter'>
				<div className='trips__status-filter-header'>
					<Button
						htmlType={TYPE_BUTTON}
						title={'Фильтр по статусу'}
						onClick={() => setShowStatusFilter(prev => !prev)}
					>
					</Button>

					<Button
						htmlType={TYPE_BUTTON}
						title={'Сброс'}
						type={STYLE_PRIMARY}
						onClick={resetStatusFilter}
					/>
				</div>

				<SmoothCollapse expanded={showStatusFIlter}>
					<StatusFilter
						value={statusFilter}
						onChange={(e) => handleChangeStatusFilter(e.target.value)}
					/>
				</SmoothCollapse>
			</div>

			{status === 'fulfilled' ?
				<div className='trips__table'>
					<div className='trips__table-row'>
						<div className='trips__table-cell'></div>

						<div className='trips__table-body'>
							<div className='trips__table-cell'>Место прибытия</div>
						</div>
					</div>

					{data.result && !isLoading && data.result.orders?.map((item, index) => {
						const { order_id, customer, destination_address } = item

						return (
							<div key={order_id} className='trips__table-row'>
								<button
									type={TYPE_BUTTON}
									className='trips__table-button'
									onClick={() => handleIndexOfShowedInfo(index)}
								>
									<Arrow className={`trips__table-icon ${clickedRowIndex === index ? 'up' : 'down'}`} />
								</button>

								<div className='trips__table-body'>
									<div className='trips__table-cell'>{destination_address}</div>

									<SmoothCollapse expanded={clickedRowIndex === index}>
										<div className='trips__table-info'>
											<p className='trips__table-info-text'>Имя: {customer.name}</p>
											<p className='trips__table-info-text'>Почта: {customer.email}</p>
											<p className='trips__table-info-text'>Телефон: {customer.phone}</p>
										</div>
									</SmoothCollapse>
								</div>
							</div>
						)
					})}
				</div>
				:
				<div className='plug'>Загрузка</div>
			}

			<PaginationComponent
				current={page}
				total={pageAmount}
				onChange={(page) => setPage(page)}
			/>
		</div>
	)
}

export default Trips
