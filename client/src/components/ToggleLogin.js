import React, { useContext } from 'react'
import RoleContext from '../Context'
import { Button } from '@material-ui/core'

const ToggleLogin = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(RoleContext)
	return (
		<Button
			variant='contained'
			onClick={() => setIsLoggedIn(!isLoggedIn)}
		>
			Log In/Out
		</Button>
	)
}

export default ToggleLogin
