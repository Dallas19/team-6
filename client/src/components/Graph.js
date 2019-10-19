import React, { useState, useEffect, useContext } from 'react'
import { Typography } from '@material-ui/core'
import {
	XYPlot,
	VerticalGridLines,
	HorizontalGridLines,
	XAxis,
	YAxis,
	MarkSeries
} from 'react-vis'
import RoleContext from '../Context'
import formatData from '../utils/FormatDataToGraph'

const Graph = () => {
	const [data, setData] = useState([])
	const { path } = useContext(RoleContext)
	useEffect(() => {
		let isSubscribed = true
		async function getData() {
			const response = await fetch(
				'http://localhost:5000/' +
					path +
					'?startMonth=July&loggedIn=false&strategy=632711',
				{
					method: 'GET',
					mode: 'cors'
				}
			)
			const newData = await response.json()
			const formattedData = formatData(newData)
			if (isSubscribed) setData([...formattedData])

			return () => (isSubscribed = false)
		}
		getData()
	}, [])
	return (
		<React.Fragment>
			<Typography variant='h6'>
				Unique Counts vs 3 Months Data (By Strategy)
			</Typography>
			{data.length !== 0 ? (
				<XYPlot width={300} height={300}>
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis />
					<YAxis />
					<MarkSeries
						className='mark-series-graph'
						strokeWidth={2}
						opacity='0.8'
						sizeRange={[0, 40]}
						data={data}
						size={2}
					/>
				</XYPlot>
			) : null}
		</React.Fragment>
	)
}

export default Graph
