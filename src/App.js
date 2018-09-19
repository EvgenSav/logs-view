import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logs from '../src/components/Logs';
import InputsComponent from './components/Inputs';
import { store, mapStateToProps } from '../src/store/myStore';

const WrappedLogsComponent = connect(mapStateToProps)(Logs);
const WrappedInputsComponent = connect(mapStateToProps)(InputsComponent);

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
        <BrowserRouter>
          <Switch>
            <Route path='/inputs' component={InputsWithStore} />
            <Route component={SomeComp} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
