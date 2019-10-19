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
const Filter = () => {
	const classes = useStyles()
	const [isOpen, setIsOpen] = useState(false)
	const [filterOption, setFilterOption] = useState({
		strategy: 0,
		indicator: 0
	})

	const handleFilterChange = e => {
		let obj = { ...filterOption }
		obj[e.target.id] = e.target.value
		setFilterOption(obj)
	}

	const handleSubmit = () => {
		// TODO: make req to end point here
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
				Send
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
