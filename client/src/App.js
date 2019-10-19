import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
// components
import NavBar from './components/NavBar'
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
    isLoggedIn;
    strategy;
    indicator;
    
    getThreeMonths(startMonth) {
        return months[startMonth]
    }




    updateData() {
        axios.get(`${endpoint}?loggedIn=${loggedIn}&strategy=${strategy}&indicator=${indicator}`)
            .then(res => {
            
            let months = this.getThreeMonths(startMonth);

    
            datas[i] = {
                months[0]+ "19": res.data[i][months[0]+ "19"],
                months[1]+ "19": res.data[i][months[1]+ "19"],
             months[2]+ "19": res.data[i][months[2]+ "19"]
            }


            programNames[i] = res.data[i]["Program_name"];

            if (loggedIn)
            {
                programNames[i] = res.data[i]["Program_name"];
                partnerName[i] = res.data[i]["Partner_name"];
            }

            annualTarget[i] = res.data[i]["AnnualTarget"]
            
            })
    }

    
    render() {
        return (
            <div>
              <NavBar />
              <br />
              <br />
              <Chart data={data}/>
            </div>
        )
    }
}

export default App;
