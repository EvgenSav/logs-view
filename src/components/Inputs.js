import React, {Component} from 'react';
import { AddTestItem, ChangeFirst, ChangeSecond} from '../store/myStore';

class InputsComponent extends Component {
    render() {
      return (
        <div>
          <div className='input-group'>
            <input type='button' className='form-control'
              value='Add log'
              onClick={() => {
                this.props.dispatch(AddTestItem('lol'));
              }}
            ></input>
          </div>
          <div className='input-group'>
            <input type='text' className='form-control'
              value={this.props.first}
              placeholder='first'
              onChange={(event) => {
                this.props.dispatch(ChangeFirst(event.target.value));
              }}
            ></input>
          </div>
          <div className='input-group'>
            <input type='text' className='form-control'
              value={this.props.second}
              placeholder='second'
              onChange={(event) => {
                this.props.dispatch(ChangeSecond(event.target.value));
              }}
            ></input>
          </div>
        </div>
      );
    }
  }
  export default InputsComponent;