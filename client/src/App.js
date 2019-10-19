import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import logo from './logo.svg';
import axios from 'axios';
// components
import Chart from './components/Chart'
import './App.css';


const endpoint = "";
class App extends React.Component {
    data;
    loggedIn;
    strategy;
    indicator;
    
    updateData() {
        axios.get(`${endpoint}?loggedIn=${loggedIn}&strategy=${strategy}&startMonth=${startMonth}&indicator=${indicator}`)
            .then(res => {
                this.setState({data: res.data})
            })
    }


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
        const charts = () => {
            
            for (let i = 0; i < datas.length; ++i) {
                <Chart data={data}/>
    	    }
        }
        
        return (
            <div>
              <div>
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="title" color="inherit">
                      Data Visualization Tool for United Way of San Antonio
                    </Typography>
                    {checkbox}
                  </Toolbar>
                </AppBar>
              </div>
              <br />
              <br />
              {charts}
            </div>
        )
    }
}

export default App;
