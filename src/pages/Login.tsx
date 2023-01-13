import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setUser } from '../store/user'

export default () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const logged = useAppSelector((state) => state.user.logged)
	const dispatch = useAppDispatch()

	const login = async (e: any) => {
		e.preventDefault()
		try {
			const { data } = await axios.post('/login', { email, password })
			dispatch(setUser({ logged: true, token: data.body.token }))
		} catch (error: any) {
			return dispatch(setUser({ logged: false, token: '', firstName: '', lastName: '' }))
		}
	}

	if (logged) {
		return <Navigate to='/profile'></Navigate>
	}

	return (
		<main className='main bg-dark'>
			<section className='sign-in-content'>
				<i className='fa fa-user-circle sign-in-icon'></i>
				<h1>Sign In</h1>
				<form>
					<div className='input-wrapper'>
						<label htmlFor='username'>Username</label>
						<input type='text' id='username' value={email} onChange={({ target: { value } }) => setEmail(value)} />
					</div>
					<div className='input-wrapper'>
						<label htmlFor='password'>Password</label>
						<input type='password' id='password' value={password} onChange={({ target: { value } }) => setPassword(value)} />
					</div>
					<div className='input-remember'>
						<input type='checkbox' id='remember-me' />
						<label htmlFor='remember-me'>Remember me</label>
					</div>
					<button className='sign-in-button' onClick={login}>
						Sign In
					</button>
				</form>
			</section>
		</main>
	)
}
