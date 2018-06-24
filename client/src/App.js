import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer, subscribeToNewData } from './api';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Paper, Grid } from '@material-ui/core';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

// const smaller = {
//   width: '40%',
// }


class App extends Component {
  state = {
    'data': []
  };

  constructor(props) {
    super(props);

    // subscribeToTimer(0, (err, timestamp) =>
    //   this.setState({ timestamp }
    //   ));

    subscribeToNewData((err, newData) => {
      var joined = this.state.data.concat(newData);
      this.setState({ data: joined });
    });
  }

  render() {
    const data = this.state.data;
    return (
      <Grid container >
        <Grid item xs={12} >
          <Grid container justify="center">
            <Paper >
              <Table>
                <TableHead>
                  <TableCell numeric>Temperature (&#8457;)</TableCell>
                  <TableCell numeric>Humidity (%)</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableHead>
                <TableBody>
                  {data.reverse().map(n => {
                    return (
                      <TableRow key={n.index}>
                        <TableCell numeric>{n.temperature}</TableCell>
                        <TableCell numeric>{n.humidity}</TableCell>
                        <TableCell>{n.time}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Grid >
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }

}

export default App;
