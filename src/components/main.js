import React from 'react'
import GoogleAnalytics from 'react-g-analytics';
import Grid from 'react-bootstrap/lib/Grid'

export default class Main extends React.Component {
    render () {
        return (
            <div>
                <GoogleAnalytics id="UA-64658154-1" />
                <Grid fluid>
                    {this.props.children}
                </Grid>
            </div>
        )
    }
}
