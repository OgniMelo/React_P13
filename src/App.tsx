import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/profile' element={<Profile />}></Route>
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

export default App
