import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'



class NavBar extends Component {
    
    loggedIn;

    toggleLog() {
        this.setState({loggedIn: !loggedIn})
    }
    
    render() {
        const checkbox = (
            <div>
              <input 
                type="checkbox"
                onClick={this.toggleLog.bind(this)} />
              <label>Checkbox</label>
            </div>
        );

        return(
            <div>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="title" color="inherit">
                    Data Visualization Tool for United Way of San Antonio
                  </Typography>
                  
                </Toolbar>
              </AppBar>
            </div>
            
        )}
}
export default NavBar;
