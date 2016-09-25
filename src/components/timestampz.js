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

    _displayFormattedTimestamp (timestamp) {
        return `${timestamp[0]}-${timestamp[1]}-${timestamp[2]} ${timestamp[3]}:${timestamp[4]}`;
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
