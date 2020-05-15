import React, {createRef} from 'react';
import {connect} from 'react-redux';
import {Form, Button, Col, Row, Card, Modal} from 'react-bootstrap';
import ReviewActions from "./actions";
import {ReviewConstants} from "./constants";
import Dropzone from "react-dropzone";

class Review extends React.Component {
  onChangeBathroomQuality = event => this.props.onChangeValue('bathroomQuality', event.target.value);
  onChangeStaffKindness = event => this.props.onChangeValue('staffKindness', event.target.value);
  onChangeCleanliness = event => this.props.onChangeValue('cleanliness', event.target.value);
  onChangeDriveThruQuality = event => this.props.onChangeValue('driveThruQuality', event.target.value);
  onChangeDeliverySpeed = event => this.props.onChangeValue('deliverySpeed', event.target.value);
  onChangeFoodQuality = event => this.props.onChangeValue('foodQuality', event.target.value);
  onChangePicture = file => this.props.onChangeValue('picture', file);

  handleSubmit = (event) => {
    event.preventDefault();
    const {openState} = this.props;
    if (openState === ReviewConstants.OPEN_STATE.NEW) {
      this.props.addReview(this.props.restaurantId);
    }
    else {
      this.props.editReview(this.props.review._id);
    }
    this.props.onHide();
  };

  dropzoneRef = createRef();
  openDialog = () => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (this.dropzoneRef.current) {
      this.dropzoneRef.current.open()
    }
  };

  componentWillMount() {
    const {review, openState} = this.props;
    if (openState == ReviewConstants.OPEN_STATE.EDIT) {
      this.props.onChangeValue('bathroomQuality', review.bathroomQuality);
      this.props.onChangeValue('staffKindness', review.staffKindness);
      this.props.onChangeValue('cleanliness', review.cleanliness);
      this.props.onChangeValue('driveThruQuality', review.driveThruQuality);
      this.props.onChangeValue('deliverySpeed', review.deliverySpeed);
      this.props.onChangeValue('foodQuality', review.foodQuality);
      // this.props.onChangeValue('picture', review.picture);
      this.props.onChangeValue('bathroomQuality', review.bathroomQuality);
    }
  }

  renderAddEditReview() {
    const {
      bathroomQuality,
      staffKindness,
      cleanliness,
      driveThruQuality,
      deliverySpeed,
      foodQuality
    } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          <Form.Group controlId="formBathroomQuality">
            <Form.Label>Bathroom Quality</Form.Label>
            <Form.Control as="select" value={bathroomQuality} onChange={this.onChangeBathroomQuality}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formStaffKindness">
            <Form.Label>Staff Kindness</Form.Label>
            <Form.Control as="select" value={staffKindness} onChange={this.onChangeStaffKindness}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formCleanliness">
            <Form.Label>Cleanliness</Form.Label>
            <Form.Control as="select" value={cleanliness} onChange={this.onChangeCleanliness}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDriveThruQuality">
            <Form.Label>Drive-thru quality [0 for no drive-thru]</Form.Label>
            <Form.Control as="select" value={driveThruQuality} onChange={this.onChangeDriveThruQuality}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDeliverySpeed">
            <Form.Label>Delivery Speed [0 if no delivery]</Form.Label>
            <Form.Control as="select" value={deliverySpeed} onChange={this.onChangeDeliverySpeed}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formFoodQuality">
            <Form.Label>Food Quality</Form.Label>
            <Form.Control as="select" value={foodQuality} onChange={this.onChangeFoodQuality}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" {...(name != '' && !location && {disabled: true})}>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    );
  }

  render() {
    const {openState} = this.props;
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
            {openState == ReviewConstants.OPEN_STATE.NEW ? <>Write review</> : <>Edit review</>}
          </Modal.Title>
        </Modal.Header>
        {this.renderAddEditReview()}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state['review'].get('user'),
    bathroomQuality: state['review'].get('bathroomQuality'),
    staffKindness: state['review'].get('staffKindness'),
    cleanliness: state['review'].get('cleanliness'),
    driveThruQuality: state['review'].get('driveThruQuality'),
    deliverySpeed: state['review'].get('deliverySpeed'),
    foodQuality: state['review'].get('foodQuality'),
    picture: state['review'].get('picture'),
    restaurant: state['review'].get('restaurant'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeValue: (name, value) => dispatch(ReviewActions.changeValue(name, value)),
    addReview: (restaurantId) => dispatch(ReviewActions.addReview(restaurantId)),
    editReview: (reviewId) => dispatch(ReviewActions.editReview(reviewId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
