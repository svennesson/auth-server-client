import React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Input from 'react-bootstrap/lib/Input'
import assign from '../util/assign'
import UserApi from '../util/user-api';

export default class Register extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            sending: false
        }
    }

    _checkValid () {
        if (this.state.name === '' || this.state.email === '' || this.state.password === '') {
           return false; 
        }

        if (this.state.password !== this.state.password2) {
            return false;
        }

        return true;
    }

    _submitMessage () {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        this.setState({sending: true})

        UserApi.create(data)
            .then(() => {
                this.props.history.push('/login');
            })
            .catch((e) => {
                console.error(e);
                this.setState({sending: false})
            });
    }

    render () {
        return (
            <div className='register'>
                <div className='register-info'>
                    <div className='header'>
                        <h1>Registrera dig</h1>
                    </div>
                    <div className='register-form'>
                        <form name='registerForm'>
                            <Row>
                                <Col md={6}>
                                    <Input required type='text' ref='name' name='name' label='Namn' value={this.state.name} onChange={assign(this, 'name')} />
                                </Col>
                                <Col md={6}>
                                    <Input required type='text' ref='email' name='email' label='Email' value={this.state.email} onChange={assign(this, 'email')} />
                                </Col>
                                <Col md={6}>
                                    <Input required type='password' ref='password' name='password' label='Password' value={this.state.password} onChange={assign(this, 'password')} />
                                </Col>
                                <Col md={6}>
                                    <Input required type='password' ref='password2' name='password2' label='Confirm password' value={this.state.password2} onChange={assign(this, 'password2')} />
                                </Col>
                            </Row>
                            <Row className='submit-button-row'>
                                <Button bsSize='large' bsStyle='primary' disabled={!this._checkValid() || this.state.sending} onClick={::this._submitMessage}>Skicka</Button>
                            </Row>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
