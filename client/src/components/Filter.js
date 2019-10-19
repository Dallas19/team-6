import React, { useState } from 'react'
import {
	TextField,
	SwipeableDrawer,
	makeStyles,
	Button
} from '@material-ui/core'

const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	},

	input: {
		display: 'none'
	}
})

// Will input the desired Strategy ID and Indicator ID
const Filter = props => {
	const classes = useStyles()
	const [isOpen, setIsOpen] = useState(false)
	const {
		filterOption,
		setFilterOption,
		triggerRefresh,
		setTriggerRefresh
	} = props
	const handleFilterChange = e => {
		let obj = { ...filterOption }
		obj[e.target.id] = e.target.value
		setFilterOption(obj)
	}

	const handleSubmit = () => {
		let endpoint
		if (filterOption.strategy === 0 && filterOption.indicator !== 0) {
			endpoint =
				'http://localhost:5000/reqByStrategy?startMonth=July&loggedIn=false&indicator=' +
				filterOption.indicator
		} else if (
			filterOption.strategy !== 0 &&
			filterOption.indicator === 0
		) {
			endpoint =
				'http://localhost:5000/reqByStrategy?startMonth=July&loggedIn=false&strategy=' +
				filterOption.strategy
		} else if (
			filterOption.strategy !== 0 &&
			filterOption.indicator !== 0
		) {
			endpoint =
				'http://localhost:5000/reqByStrategy?startMonth=July&loggedIn=false&strategy=' +
				filterOption.strategy +
				'&indicator=' +
				filterOption.indicator
		}
		setTriggerRefresh(!triggerRefresh)
	}

	const sideList = () => (
		<div className={classes.list} role='presentation'>
			<TextField
				id='strategy'
				label='Strategy ID'
				value={filterOption.strategy}
				onChange={handleFilterChange}
				type='number'
				InputLabelProps={{
					shrink: true
				}}
				margin='normal'
				variant='outlined'
			/>
			<TextField
				id='indicator'
				label='Indicator ID'
				value={filterOption.indicator}
				onChange={handleFilterChange}
				type='number'
				InputLabelProps={{
					shrink: true
				}}
				margin='normal'
				variant='outlined'
			/>
			<Button variant='contained' onClick={handleSubmit}>
				Apply
			</Button>
		</div>
	)

	return (
		<div>
			<Button variant='contained' onClick={() => setIsOpen(!isOpen)}>
				Filter
			</Button>
			<SwipeableDrawer
				open={isOpen}
				onClose={() => setIsOpen(false)}
				onOpen={() => setIsOpen(true)}
			>
				{sideList()}
			</SwipeableDrawer>
		</div>
	)
}

export default Filter
