import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'

const Header = () => {
	const useStyles = makeStyles({
		root: {
			flexGrow: 1
		},
		appbar: {
			alignItems: 'center'
		},
		typography: {
			flexGrow: 1,
			align: 'center'
		}
	})
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<AppBar className={classes.appbar} position='static'>
				<Toolbar variant='regular'>
					<Typography
						variant='h6'
						className={classes.typography}
					>
						United Way - Performance
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
