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

const Graph = props => {
	return (
		<React.Fragment>
			<Typography variant='h6'>
				Unique Counts vs 3 Months Data (By Strategy)
			</Typography>

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
					data={props.data}
					size={2}
				/>
			</XYPlot>
		</React.Fragment>
	)
}

export default Graph
