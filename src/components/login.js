import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Input from 'react-bootstrap/lib/Input'
import assign from '../util/assign'
import UserApi from '../util/user-api';

export default class Login extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            sending: false,
            errorCode: 0
        }
    }

    _checkValid () {
        if (this.state.email === '' || this.state.password === '') {
           return false; 
        }

        return true;
    }

    _logIn () {
        this.setState({sending: true})

        UserApi.login(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/timestamps');
            })
            .catch(e => {
                this.setState({
                    errorCode: e.status,
                    sending: false
                })
                console.error(e);
            });
    }

    _renderErrorMessage () {
        return (
            <Row>
                <h3>Wrong username and/or passowrd</h3>
            </Row>
        )
    }

    render () {
        return (
            <div className='register'>
                <div className='register-info'>
                    <div className='header'>
                        <h1>Logga in</h1>
                    </div>
                    <div className='register-form'>
                        <form name='registerForm'>
                            <Row>
                                <Col md={12}>
                                    <Input required type='text' ref='email' name='email' label='Email' value={this.state.email} onChange={assign(this, 'email')} />
                                </Col>
                                <Col md={12}>
                                    <Input required type='password' ref='password' name='password' label='Password' value={this.state.password} onChange={assign(this, 'password')} />
                                </Col>
                            </Row>
                            <Row className='submit-button-row'>
                                <Button bsSize='large' bsStyle='primary' disabled={!this._checkValid() || this.state.sending} onClick={::this._logIn}>Logga in</Button>
                            </Row>
                            {this.state.errorCode === 401 ? this._renderErrorMessage() : null}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
