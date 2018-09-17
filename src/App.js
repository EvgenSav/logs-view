import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Logs />
      </div>
    );
  }
}

class TableHead extends Component {
  render() {
    return (
      <thead className="thead-dark" >
        <tr>
          <th scope="col">Action</th>
          <th scope="col">Time</th>
          <th scope="col">User</th>
          <th scope="col">Company</th>
          <th scope="col">IP</th>
          <th scope="col">ArgType</th>
          <th scope="col">ArgValue</th>
        </tr>
      </thead>
    );
  };
}

class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LogItems: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost/admin/api/Logs/All',
      type: 'get',
      data: {},
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState(
          {
            LogItems: data,
            isLoaded: true
          }
        );
        console.log("get from server received!!!");
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    console.log("get to server sent!!!");
  }


  render() {
    const logs = this.state.LogItems;
    const LogView = logs.map((item) => {
      const logItem = item;
      const time = logItem.TimeStampUtc;
      //convert to local datetime
      logItem.TimeStampUtc = new Date(time).toLocaleString();
      return <LogItem key={item.Id} data={logItem} />
    });
    return (
      <table className="table table-bordered" >
        <TableHead />
        <tbody>
          {LogView}
        </tbody>
      </table>
    );
  }
}

class LogItem extends Component {
  render() {
    const argval = this.props.data.ArgType !== "LoanId" ? this.props.data.ArgValue : this.props.data.GuidArgValue;
    return (
      <tr>
        <td>{this.props.data.ActionName}</td>
        <td>{this.props.data.TimeStampUtc}</td>
        <td>{this.props.data.UserName}</td>
        <td>{this.props.data.CompanyName}</td>
        <td>{this.props.data.UserIp}</td>
        <td>{this.props.data.ArgType}</td>
        <td>{argval}</td>
      </tr>
    );
  };
}
export default App;
