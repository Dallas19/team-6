import React, { useState, useEffect } from 'react'
import { Container, Grid, Card, CardContent } from '@material-ui/core'
import RoleContext from '../src/Context'
import Header from './components/Header'
import Filter from './components/Filter'
import Graph from './components/Graph'
import ToggleLogin from './components/ToggleLogin'

import formatData from './utils/FormatDataToGraph'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [path, setPath] = useState('reqByStrategy')
	const [data, setData] = useState([])
	const [filterOption, setFilterOption] = useState({
		strategy: 632711,
		indicator: 933977
	})
	const [triggerRefresh, setTriggerRefresh] = useState(false)

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

	useEffect(() => {
		let isSubscribed = true
		async function getData() {
			let apiURL =
				'http://localhost:5000/' +
				path +
				'?startMonth=July&loggedIn=' +
				isLoggedIn
			apiURL +=
				filterOption.strategy !== 0
					? '&strategy=' + filterOption.strategy
					: ''
			apiURL +=
				filterOption.indicator !== 0
					? '&indicator=' + filterOption.indicator
					: ''
			const response = await fetch(apiURL, {
				method: 'GET',
				mode: 'cors'
			})
			const newData = await response.json()
			const formattedData = formatData(newData)
			console.log(newData)
			if (isSubscribed) setData([...formattedData])

			return () => (isSubscribed = false)
		}
		getData()
	}, [triggerRefresh])

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
									<Filter
										filterOption={filterOption}
										setFilterOption={
											setFilterOption
										}
										triggerRefresh={
											triggerRefresh
										}
										setTriggerRefresh={
											setTriggerRefresh
										}
									/>
									{data.length !== 0 ? (
										<Graph data={data} />
									) : null}
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
