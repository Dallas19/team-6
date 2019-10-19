import React, { useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import RoleContext from '../src/Context'
import Header from './components/Header'
import Filter from './components/Filter'
import Graph from './components/Graph'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	return (
		<div>
			<RoleContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
				<div>
					<Header />
				</div>
				<div className='appBody' style={{ paddingTop: '10px' }}>
					<Container maxWidth='lg'>
						<Grid
							container
							direction='row'
							justify='space-around'
							alignItems='center'
						>
							<Filter />
							<Graph />
						</Grid>
					</Container>
				</div>
			</RoleContext.Provider>
		</div>
	)
}

export default App
