import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Logs from '../src/components/Logs';
import InputsComponent from './components/Inputs';
import { store, mapStateToProps } from '../src/store/myStore';

const WrappedLogsComponent = withRouter(connect(mapStateToProps)(Logs));
const WrappedInputsComponent = withRouter(connect(mapStateToProps)(InputsComponent));

class SomeComp extends Component {
  render() {
    return (
      <Provider store={store}>
        <WrappedLogsComponent />
      </Provider>
    );
  }
}
function InputsWithStore() {
  return (
    <Provider store={store}>
      <WrappedInputsComponent />
    </Provider>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h3 className="App-intro">
          Logs view app
        </h3>
        {/* Router */}
        <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/inputs' component={WrappedInputsComponent} />
            <Route component={WrappedLogsComponent} />
          </Switch>
        </BrowserRouter>
        </Provider>
      </div>
    );
  }
}
export default App;
