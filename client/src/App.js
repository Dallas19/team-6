import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
// components
import NavBar from './components/NavBar'
import Chart from './components/Chart'
import './App.css';


const endpoint = "";
class App extends React.Component {
    data;
    isLoggedIn;
    strategy;
    indicator;
    
    updateData() {
        axios.get(`${endpoint}?loggedIn=${loggedIn}&strategy=${strategy}&indicator=${indicator}`)
            .then(res => {
                this.setState({data: res.data})
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
