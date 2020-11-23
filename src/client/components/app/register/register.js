import React, {createRef} from 'react';
import connect from "react-redux/es/connect/connect";
import {Form, Button, Col, Row, Card} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import './register.scss';
import RegisterActions from "./actions";

import 'react-geosuggest/module/geosuggest.css';
import Geosuggest from 'react-geosuggest';


class Register extends React.Component {
  componentDidMount() {
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.registerUser();
  }

  dropzoneRef = createRef();
  openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (this.dropzoneRef.current) {
      this.dropzoneRef.current.open()
    }
  };

  onChangeUsername = event => {
    this.props.checkIsUsernameFree(event.target.value);
    this.props.onChangeValue('username', event.target.value)
  };
  onChangePassword = event => this.props.onChangeValue('password', event.target.value);
  onChangeLocation = value => this.props.onChangeValue('location', value ? {label: value.label, location: value.location} : null);
  onChangePicture = file => this.props.onChangeValue('picture', file);

  showUsernameIndicator = () => this.props.userTaken ? (<Form.Text className="text-danger">
    This username is already in use.
  </Form.Text>) : (<Form.Text className="text-success">
    Username is free!
  </Form.Text>);

  renderForm = () => {
    const {username, password, location, userTaken} = this.props;
    return (
    <div className="registerForm">
      <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
      <Form.Text as="h1" style={{textAlign: "center"}}>Register</Form.Text>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={this.onChangeUsername}/>
        {username != '' ? this.showUsernameIndicator() : null}
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={this.onChangePassword}/>
        <Form.Text className="text-muted">
          Please enter a strong password.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Geosuggest onSuggestSelect={this.onChangeLocation} onChange={() =>this.onChangeLocation(null)} />
      </Form.Group>
      <Form.Group controlId="formPicture">
        <Form.Label>Picture</Form.Label>
        <Dropzone ref={this.dropzoneRef} noClick noKeyboard accept={'image/*'}
                  onDrop={acceptedFiles => this.onChangePicture(acceptedFiles[0])}>
          {({getRootProps, getInputProps, acceptedFiles}) =>
            (
              <div className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()}/>
                  <p>Drag 'n' drop some files here</p>
                  <Button variant="link"
                          type="button"
                          onClick={this.openDialog}
                  >
                    Open File Dialog
                  </Button>
                </div>
                <Form.Text className="text-muted">
                  {acceptedFiles.map(file => (
                    <li key={file.path}>
                      {file.path} - {file.size} bytes
                    </li>
                  ))}
                </Form.Text>
              </div>
            )
          }
        </Dropzone>
      </Form.Group>
      <Button variant="primary" className="formButton" type="submit" style={{alignItem:"center"}} {...(userTaken || location == null && {disabled: true})}>
        Register
      </Button>
    </Form>
  </div>
  );
  };

  renderCompleteMessage = () => {
    return (<Card>
      <Card.Header as="h5">Registration complete</Card.Header>
      <Card.Body>
        <Card.Text>
          Please use the link below to log in.
        </Card.Text>
        <Button variant="primary" href="/login">Login</Button>
      </Card.Body>
    </Card>);
  };

  renderErrorMessage = () => {
    return (<Card border="danger" className="card">
      <Card.Header as="h5">Registration failed!</Card.Header>
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
      <div className="container col-md-6">
          {error ? this.renderErrorMessage() : null}
          {completed ? this.renderCompleteMessage() : this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state['register'].get('username'),
    password: state['register'].get('password'),
    location: state['register'].get('location'),
    picture: state['register'].get('picture'),
    userTaken: state['register'].get('userTaken'),
    completed: state['register'].get('completed'),
    error: state['register'].get('error'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (name, value) => dispatch(RegisterActions.changeValue(name, value)),
    checkIsUsernameFree: (username) => dispatch(RegisterActions.checkUserExists(username)),
    registerUser: () => dispatch(RegisterActions.registerUser()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

