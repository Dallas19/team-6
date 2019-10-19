import React, { useState, useEffect } from 'react'
import {
	XYPlot,
	VerticalGridLines,
	HorizontalGridLines,
	XAxis,
	YAxis,
	MarkSeries
} from 'react-vis'
import formatData from '../utils/FormatDataToGraph'

const Graph = () => {
	const [data, setData] = useState([])
	useEffect(() => {
		let isSubscribed = true
		async function getData() {
			const response = await fetch(
				'http://localhost:5000/reqByStrategy?startMonth=July&loggedIn=false&strategy=631713',
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
			{data.length !== 0 ? (
				<XYPlot width={600} height={600}>
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
					/>
				</XYPlot>
			) : null}
		</React.Fragment>
	)
}

export default Graph
