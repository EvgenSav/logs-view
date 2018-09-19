import React, { Component } from 'react';

class LogItem extends Component {
  render() {
    const argval = this.props.data.ArgType !== 'LoanId' ? this.props.data.ArgValue : this.props.data.GuidArgValue;
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
  }
}
export default LogItem;