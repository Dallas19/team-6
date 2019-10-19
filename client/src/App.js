import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

// components
import Chart from './components/Chart'

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

const endpoint = ''
class App extends React.Component {
	datas
	startMonth
	
	strategy
	indicator
	programNames
	partnerNames

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
        this.toggleLog = this.toggleLog.bind(this);
    }
	getThreeMonths(startMonth) {
		return months[startMonth]
	}
	updateData() {}

	toggleLog(event) {
		this.setState({ loggedIn: !this.state.loggedIn })
	}

	render() {
		let checkbox = (
			<div>
			  <label>Logged in</label>
			  <input
				type='checkbox'
				onClick={this.toggleLog} />
			</div>
		);
		let charts = [];
        if (this.datas){
		    for (let i = 0; i < this.datas.length; ++i) {
			    charts.push(
				    <Chart data={this.datas[i]}
				           program={this.programNames[i]}
				           partner={this.partnerName[i]}
				           target={this.targets[i]} />
			    );
		    }}
        let msg = (this.state.loggedIn)? "yes" : "no";

		return (
			<div>
			  <div>
				<AppBar position='static'>
				  <Toolbar>
					<Typography variant='title' color='inherit'>
					  Data Visualization Tool for United Way
					  of San Antonio
					</Typography>
                    <div className="checkbox">
			          {checkbox}
                    </div>
				  </Toolbar>
				</AppBar>
			  </div>
			  <br />
			  <br />
			  {charts}
              Logged In: {msg}
			</div>
		)
	}
}

export default App
