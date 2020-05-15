import React from 'react';
import {connect} from 'react-redux';
import {Form, Button, Col, Row, Card, Modal} from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';
import AddRestaurantActions from "./actions";

class AddRestaurant extends React.Component {
  onChangeName = event => this.props.onChangeValue('name', event.target.value);
  onChangeLocation = value => this.props.onChangeValue('location', value ? {label: value.label, location: value.location} : null);

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addRestaurant();
    this.props.onHide();
  };

  render() {
    const {name, location} = this.props;
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Restaurant
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formName">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={this.onChangeName}/>
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Geosuggest onSuggestSelect={this.onChangeLocation} onChange={() =>this.onChangeLocation(null)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" {...(name != '' && !location && {disabled: true})}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state['addRestaurant'].get('name'),
    location: state['addRestaurant'].get('location'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (name, value) => dispatch(AddRestaurantActions.changeValue(name, value)),
    addRestaurant: () => dispatch(AddRestaurantActions.addRestaurant()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);
