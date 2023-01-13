import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setUser } from '../store/user'

export default () => {
	const logged = useAppSelector((state) => state.user.logged)
	const firstName = useAppSelector((state) => state.user.firstName)

	const dispatch = useAppDispatch()

	const logout = () => {
		dispatch(setUser({ logged: false, token: '', firstName: '', lastName: '' }))
	}

	return (
		<nav className='main-nav'>
			<Link className='main-nav-logo' to='/'>
				<img className='main-nav-logo-image' src='/img/argentBankLogo.png' alt='Argent Bank Logo' />
				<h1 className='sr-only'>Argent Bank</h1>
			</Link>
			<div>
				{logged ? (
					<>
						<Link className='main-nav-item' to='/profile'>
							<i className='fa fa-user-circle'></i>
							{firstName}
						</Link>
						<Link className='main-nav-item' to='/' onClick={logout}>
							<i className='fa-solid fa-right-from-bracket'></i>
							Sign Out
						</Link>
					</>
				) : (
					<Link className='main-nav-item' to='/login'>
						<i className='fa fa-user-circle'></i>
						Sign In
					</Link>
				)}
			</div>
		</nav>
	)
}
