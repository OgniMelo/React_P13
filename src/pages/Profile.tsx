import { useEffect, useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setUser, updateUser } from '../store/user'

export default () => {
	const [editing, setEditing] = useState<boolean>(false)
	const logged = useAppSelector((state) => state.user.logged)
	const token = useAppSelector((state) => state.user.token)
	const firstName = useAppSelector((state) => state.user.firstName)
	const lastName = useAppSelector((state) => state.user.lastName)
	const dispatch = useAppDispatch()

	const firstNameInput = useRef(document.createElement('input'))
	const lastNameInput = useRef(document.createElement('input'))

	const changeName = () => {
		dispatch(updateUser({ token, firstName: firstNameInput.current.value, lastName: lastNameInput.current.value }))
		setEditing(false)
	}

	useEffect(() => {
		const getUserInfos = async () => {
			try {
				const { data } = await axios.post('/profile', undefined, { headers: { Authorization: 'Bearer ' + token } })
				dispatch(setUser({ firstName: data.body.firstName, lastName: data.body.lastName }))
			} catch (error: any) {
				return
			}
		}
		getUserInfos()
	}, [])

	if (!logged) {
		return <Navigate to='/login'></Navigate>
	}

	return (
		<main className='main bg-dark'>
			<div className='header'>
				{!editing ? (
					<>
						<h1>
							Welcome back
							<br />
							{firstName + ' ' + lastName}!
						</h1>
						<button className='edit-button' onClick={() => setEditing(true)}>
							Edit Name
						</button>
					</>
				) : (
					<>
						<h1>Welcome back</h1>
						<br />
						<div className='flex-center'>
							<input ref={firstNameInput} placeholder={firstName} defaultValue={firstName} />
							<input ref={lastNameInput} placeholder={lastName} defaultValue={lastName} />
						</div>
						<div className='flex-center'>
							<button className='user-button' onClick={changeName}>
								Save
							</button>
							<button className='user-button' onClick={() => setEditing(false)}>
								Cancel
							</button>
						</div>
					</>
				)}
			</div>
			<h2 className='sr-only'>Accounts</h2>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>Argent Bank Checking (x8349)</h3>
					<p className='account-amount'>$2,082.79</p>
					<p className='account-amount-description'>Available Balance</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>View transactions</button>
				</div>
			</section>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>Argent Bank Savings (x6712)</h3>
					<p className='account-amount'>$10,928.42</p>
					<p className='account-amount-description'>Available Balance</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>View transactions</button>
				</div>
			</section>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>Argent Bank Credit Card (x8349)</h3>
					<p className='account-amount'>$184.30</p>
					<p className='account-amount-description'>Current Balance</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>View transactions</button>
				</div>
			</section>
		</main>
	)
}
