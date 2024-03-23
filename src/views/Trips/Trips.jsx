import './Trips.scss'
import { useGetTripsQuery } from "../../redux/tripsService/tripsApi"
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuthorized } from '../../redux/authService/authSlice'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { ReactComponent as Arrow } from '../../assets/arrow_down.svg'
import { ReactComponent as Logout } from '../../assets/logout.svg'

const Trips = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [clickedRowIndex, setClickedRowIndex] = useState('')
	const [queryKey, setQueryKey] = useState('')
	const [searchValue, setSearchValue] = useState('')

	const { data = {}, isLoading, error } = useGetTripsQuery(
		{ [queryKey]: searchValue, page: 2 },
		{ skip: searchValue && !queryKey }
	)

	function handleClick(index) {
		if (index === clickedRowIndex) {
			setClickedRowIndex('')
		} else {
			setClickedRowIndex(index)
		}
	}

	function handleOnChangeSearch(value) {
		setSearchValue(value)
		setQueryKey('')
	}

	function handleSearchButton() {
		if (searchValue.includes('@')) {
			setQueryKey('email')
		} else {
			setQueryKey('names')
		}
	}

	function logOut() {
		localStorage.clear()
		dispatch(setAuthorized(false))
		navigate('/login')
	}

	if (isLoading) return <>Загрузка</>
	if (error) return <>Сервис недоступен</>

	return (
		<div className='trips__wrapper'>
			<div className='trips__header'>
				<button
					onClick={logOut}
					type='button'
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
					type={'text'}
				/>

				<Button
					type={'primary'}
					title={'Найти'}
					htmlType={'submit'}
					onClick={handleSearchButton}
				/>
			</div>

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
								type='button'
								className='trips__table-button'
								onClick={() => handleClick(index)}
							>
								<Arrow className='trips__table-icon' />
							</button>

							<div className='trips__table-body'>
								<div className='trips__table-cell'>{destination_address}</div>

								<div className={`trips__table-info ${clickedRowIndex === index ? 'show' : 'hidden'}`}>
									<p className='trips__table-info-text'>Имя: {customer.name}</p>
									<p className='trips__table-info-text'>Почта: {customer.email}</p>
									<p className='trips__table-info-text'>Телефон: {customer.phone}</p>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Trips
