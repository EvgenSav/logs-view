import React, { Component } from 'react';
import $ from 'jquery';
import LogItem from './LogItem';
import { ReloadItems } from '../store/myStore';

class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LogItems: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost/admin/api/Logs/All',
            type: 'get',
            data: {},
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.props.dispatch(ReloadItems(data));
                /* this.setState(
                  {
                    LogItems: data,
                    isLoaded: true
                  }
                ); */
                console.log('get from server received!!!');
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
        console.log('get to server sent!!!');
    }
    render() {
        const logs = this.props.items;
        console.log(this.props);
        const LogView = logs.map((arrayItem) => {
            const logItem = arrayItem;
            const time = logItem.TimeStampUtc;
            //convert to local datetime
            logItem.TimeStampUtc = new Date(time).toLocaleString();
            return <LogItem key={arrayItem.Id} data={logItem} />;
        });
        return (
            <div>
                <table className="table table-bordered" >
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
                    <tbody>
                        {LogView}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Logs;