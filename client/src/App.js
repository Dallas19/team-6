import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import logo from './logo.svg';
import axios from 'axios';
// components
import Chart from './components/Chart'
import './App.css';

const months = {
    January: ['January', 'February', 'March'],
    February: ['February', 'March', 'April'],
    March: ['March', 'April', 'May'],
    April: ['April', 'May', 'June'],
    May: ['May', 'June', 'July'],
    June: ['June', 'July', 'August'],
    July: ['July', 'August', 'September'],
    August: ['August', 'September', 'October'],
    September: ['September', 'October', 'November'],
    October: ['October', 'November', 'December'],
    November: ['November', 'December', 'January'],
    December: ['December', 'January', 'February']
}

const endpoint = "";
class App extends React.Component {
    datas;
    startMonth;
    loggedIn;
    strategy;
    indicator;
    programNames;
    partnerNames;
    
    getThreeMonths(startMonth) {
        return months[startMonth]
    }
    updateData() {
        axios.get(`${this.endpoint}?loggedIn=${this.loggedIn}&strategy=${this.strategy}&startMonth=${this.startMonth}&indicator=${this.indicator}`)
            .then(res => {
                for (let i = 0; i < res.data.length; ++i) {
    	            
                    let months = this.getThreeMonths(this.startMonth);


                    for (let j = 0; j < 3; ++j) {
                        this.datas[i][months[j]+"19"] = res.data[i][months[j]+"19"];    	            
                    }


                    this.programNames[i] = res.data[i]["Program_name"];

                    if (this.loggedIn)
                    {
                        this.programNames[i] = res.data[i]["Program_name"];
                        this.partnerNames[i] = res.data[i]["Partner_name"];
                    }

                    this.annualTarget[i] = res.data[i]["AnnualTarget"]
                }
                
            })
    }


    toggleLog() {
        this.setState({loggedIn: !this.loggedIn})
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
            let charts = [];
            for (let i = 0; i < this.datas.length; ++i) {
                charts.push(<Chart data={this.datas[i]}
                                   program={this.programNames[i]}
                                   partner={this.partnerName[i]}
                                   target={this.targets[i]}/>)
    	    }
            return charts
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
