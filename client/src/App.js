import React, { useState, useEffect } from 'react'
import { Container, Grid, Card, CardContent } from '@material-ui/core'
import RoleContext from '../src/Context'
import Header from './components/Header'
import Filter from './components/Filter'
import Graph from './components/Graph'
import ToggleLogin from './components/ToggleLogin'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [path, setPath] = useState('reqByStrategy')

	useEffect(() => {
		let isSubscribed = true
		async function getIfLoggedIn() {
			const response = await fetch('http://localhost:5000/login', {
				method: 'GET',
				mode: 'cors'
			})
			const loggedInObj = await response.json()
			if (isSubscribed) setIsLoggedIn(loggedInObj['isLoggedIn'])
		}
		getIfLoggedIn()

		return () => (isSubscribed = false)
	}, [])

	return (
		<div>
			<RoleContext.Provider
				value={{ isLoggedIn, path, setIsLoggedIn, setPath }}
			>
				<div>
					<Header />
				</div>
				<div className='appBody' style={{ paddingTop: '10px' }}>
					<Container maxWidth='lg'>
						<Card>
							<CardContent>
								<Grid
									container
									direction='row'
									justify='space-around'
									alignItems='center'
								>
									<Filter />
									<Graph />
									<ToggleLogin />
								</Grid>
							</CardContent>
						</Card>
					</Container>
				</div>
			</RoleContext.Provider>
		</div>
	)
}

export default App
