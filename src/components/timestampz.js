import React from 'react'
import assign from '../util/assign'
import UserApi from '../util/user-api';
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

export default class Timestampz extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            timestampz: []
        }

        UserApi.getTimestamps()
            .then((response) => {
                this.setState({
                    timestampz: response
                })
            })
            .catch((e) => {
                console.error(e);
            })
    }

    _formatTimestamp (time) {
        if (time < 10) {
            return '0' + time;
        }

        return time;
    }

    _displayFormattedTimestamp (timestamp) {
        var year = timestamp[0];
        var month = this._formatTimestamp(timestamp[1]);
        var day = this._formatTimestamp(timestamp[2]);
        var hour = this._formatTimestamp(timestamp[3]);
        var minute = this._formatTimestamp(timestamp[4]);

        return `${year}-${month}-${day} ${hour}:${minute}`;
    }

    render () {
        return (
            <Grid className="container-spacing center-div">
                <Row>
                    <h1>Senaste inloggningar</h1>
                </Row>
                <Row>
                    <ul>
                        {this.state.timestampz.map((timestamp) => {
                            return <li key={timestamp.id}><h3>{this._displayFormattedTimestamp(timestamp.timestamp)}</h3></li>;
                        })}
                    </ul>
                </Row>
            </Grid>
        )
    }
}
