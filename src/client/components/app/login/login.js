import React from 'react';
import connect from "react-redux/es/connect/connect";
import {Form, Button, Col, Row, Card} from 'react-bootstrap';
import './login.scss';
import LoginActions from "./actions";

class Login extends React.Component {
  componentDidMount() {
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser();
  }

  onChangeUsername = event => this.props.onChangeValue('username', event.target.value);
  onChangePassword = event => this.props.onChangeValue('password', event.target.value);


  renderForm = () => {
    const {username, password, location, userTaken} = this.props;
    return (
    <div className="loginForm">
    <Form onSubmit={this.handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={this.onChangeUsername}/>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={this.onChangePassword}/>
      </Form.Group>
      <Button variant="primary" type="submit" {...(userTaken && {disabled: true})}>
        Submit
      </Button>
    </Form>
    </div>
    );
  };

  renderCompleteMessage = () => {
    return (<Card>
      <Card.Header as="h5">Login complete</Card.Header>
      <Card.Body>
        <Card.Text>
          Please use the link below to go to the site.
        </Card.Text>
        <Button variant="primary" href="/">Go to main page</Button>
      </Card.Body>
    </Card>);
  };

  renderErrorMessage = () => {
    return (<Card border="danger" className="card">
      <Card.Header as="h5">Login failed!</Card.Header>
      <Card.Body>
        <Card.Text>
          Please try again.
        </Card.Text>
      </Card.Body>
    </Card>);
  };

  render() {
    const {completed, error} = this.props;
    return (
      <Row>
        <Col></Col>
        <Col xs={6}>
          {error ? this.renderErrorMessage() : null}
          {completed ? this.renderCompleteMessage() : this.renderForm()}
        </Col>
        <Col></Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state['login'].get('username'),
    password: state['login'].get('password'),
    completed: state['login'].get('completed'),
    error: state['login'].get('error'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (name, value) => dispatch(LoginActions.changeValue(name, value)),
    loginUser: () => dispatch(LoginActions.loginUser()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

