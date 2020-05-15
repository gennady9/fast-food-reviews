import React from 'react';
import './profiles.scss';
import {connect} from 'react-redux';
import ProfilesActions from './actions';
import {Container, Button, InputGroup, FormControl, Table, Form, Row, Col} from 'react-bootstrap';

class Profiles extends React.Component {

  renderUserResult(index, userId, username, location) {
    return (
      <tr key={userId}>
        <td>{index}</td>
        <td><Button variant="link" onClick={() => this.props.history.push(`/profiles/${userId}`)}>{username}</Button></td>
        <td>{location}</td>
      </tr>
    );
  }

  usersTable = () => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Location</th>
        </tr>
        </thead>
        <tbody>
        {this.props.users.map((user, index) => this.renderUserResult(index + 1, user.id, user.username, user.location))}
        </tbody>
      </Table>
    );
  };

  handleSearch = (event) => {
    event.preventDefault();
    this.props.searchUsers();
  }

  render() {
    return (
      <div className="profiles-root">
        <div className="profiles-header">
          <h2>Search users</h2>
          <Row><Col xs={3}></Col><Col xs={6}>
          <Form onSubmit={this.handleSearch}>
            <Form.Group controlId="formUserName">
              <Form.Control type="text"
                            placeholder="User's name"
                            value={this.props.searchUser}
                            onChange={(value) => this.props.onChangeValue('searchUser', value.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formUserLocation">
              <Form.Control type="text"
                            placeholder="Location"
                            value={this.props.searchLocation}
                            onChange={(value) => this.props.onChangeValue('searchLocation', value.target.value)}/>
            </Form.Group>
            <Form.Group>
              <div key="inline-checkbox" className="mb-3">
                <Form.Check inline label="By name" type="checkbox" id="inline-checkbox-1"
                            value={this.props.searchNameEnabled}
                            onChange={(value) => this.props.onChangeValue('searchNameEnabled', value.target.checked)}/>
                <Form.Check inline label="By location" type="checkbox" id="inline-checkbox-2"
                            value={this.props.searchLocationEnabled}
                            onChange={(value) => this.props.onChangeValue('searchLocationEnabled', value.target.checked)}/>
              </div>
            </Form.Group>
            <Button variant="secondary" type="submit">Search</Button>
          </Form>
          </Col><Col xs={3}></Col></Row>
        </div>
        {this.usersTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchUser: state['profiles'].get('searchUser'),
    searchLocation: state['profiles'].get('searchLocation'),
    searchNameEnabled: state['profiles'].get('searchNameEnabled'),
    searchLocationEnabled: state['profiles'].get('searchLocationEnabled'),
    users: state['profiles'].get('users').toJS(),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (name, value) => dispatch(ProfilesActions.changeValue(name, value)),
    searchUsers: () =>dispatch(ProfilesActions.searchUsers())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
