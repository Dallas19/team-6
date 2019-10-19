import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines} from 'react-vis';


class Chart extends Component {

  data = [];

  constructor (props) {
    super(props);
    let keys = Object.keys(props.data), 
        values = Object.values(props.data);



    for (let count =0; count < keys.length; count++)
    {

        this.data[count].x = keys[count];
        this.data[count].y = values[count];
 
    }

  }
  render () {
    /*const data = [
      {x: "ABC", y: 8},
      {x: "1", y: 5},
      {x: "2", y: 4},
      {x: "3", y: 9},
      {x: "4", y: 1},
      {x: "5", y: 7},
      {x: "6", y: 6},
      {x: "7", y: 3},
      {x: "8", y: 2},
      {x: "9", y: 0},
    ];
    */
    return (
      <div className="App">
        <XYPlot xType='ordinal' height={300} width={1000}>

        onSeriesMouseOver={(event)=>{

          <VerticalGridLines/>
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={data} />
        </XYPlot>
      </div>
    );
  }
}

export default Chart;
