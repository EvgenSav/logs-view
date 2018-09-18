import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'

const initialState = {
  first: "qwer",
  second: "zxc",
  items: [],
  testItems: []
};

const rootReducer = function (state = initialState, action) {
  switch (action.type) {
    case ACTION_CHANGE_FIRST_NAME:
      return { ...state, first: action.payload }
    case ACTION_CHANGE_SECOND_NAME:
      return { ...state, second: action.payload }
    case ACTION_ADD_TEST_ITEM:
      const newItems = state.testItems.slice();
      newItems.push(action.payload);
      return { ...state, testItems: newItems }
    case ACTION_UPDATE_LOG_ITEMS:
      const _items = action.payload.slice();
      return { ...state, items: _items }
    default:
      return state;
  }

};
const store = createStore(rootReducer);
//ACTION TYPES
const ACTION_CHANGE_FIRST_NAME = 'ACTION_CHANGE_FIRST_NAME';
const ACTION_CHANGE_SECOND_NAME = 'ACTION_CHANGE_SECOND_NAME';
const ACTION_ADD_TEST_ITEM = 'ACTION_ADD_TEST_ITEM';
const ACTION_UPDATE_LOG_ITEMS = 'ACTION_UPDATE_LOG_ITEMS';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    first: state.first,
    second: state.second,
    items: state.items,
    testItems: state.testItems
  };
};

//ACTIONS
const ChangeFirst = (newFirst) => {
  console.log("change first name executed");
  return {
    type: ACTION_CHANGE_FIRST_NAME,
    payload: newFirst
  }
};
const ChangeSecond = (newSecond) => {
  console.log("change second name executed");
  return {
    type: ACTION_CHANGE_SECOND_NAME,
    payload: newSecond
  }
};

const AddTestItem = (newTestItem) => {
  console.log("add test item executed");
  return {
    type: ACTION_ADD_TEST_ITEM,
    payload: newTestItem
  }
};

const UpdateItems = (logItems) => {
  console.log("update log items executed");
  return {
    type: ACTION_UPDATE_LOG_ITEMS,
    payload: logItems
  }
};

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
        store.dispatch(UpdateItems(data));
        /* this.setState(
          {
            LogItems: data,
            isLoaded: true
          }
        ); */
        console.log("get from server received!!!");
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    console.log("get to server sent!!!");
  }


  render() {
    const logs = this.props.items;
    const LogView = logs.map((item) => {
      const logItem = item;
      const time = logItem.TimeStampUtc;
      //convert to local datetime
      logItem.TimeStampUtc = new Date(time).toLocaleString();
      return <LogItem key={item.Id} data={logItem} />
    });
    return (
      <div>
        <div className='input-group'>
          <input type='button' className='form-control'
            value='Add log'
            onClick={() => {
              store.dispatch(AddTestItem("lol"));
            }}
          ></input>
        </div>
        <div className='input-group'>
          <input type='text' className='form-control'
            value={this.props.first}
            placeholder='first'
            onChange={(event) => {
              store.dispatch(ChangeFirst(event.target.value));
            }}
          ></input>
        </div>
        <div className='input-group'>
          <input type='text' className='form-control'
            value={this.props.second}
            placeholder='second'
            onChange={(event) => {
              store.dispatch(ChangeSecond(event.target.value));
            }}
          ></input>
        </div>
        <table className="table table-bordered" >
          <TableHead />
          <tbody>
            {LogView}
          </tbody>
        </table>
      </div>
    );
  }
}
const WrappedLogsComponent = connect(mapStateToProps)(Logs);

class SomeComp extends Component {
  render() {
    return (
      <Provider store={store}>
        <WrappedLogsComponent />
      </Provider>
    );
  };
}
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
        <BrowserRouter>
          <Route path='/new' component={SomeComp} />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
