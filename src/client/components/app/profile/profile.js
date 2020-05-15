import React from 'react';
import '../profiles/profiles.scss';
import {connect} from 'react-redux';
import {ScrollPanel} from 'primereact/scrollpanel';
import ProfileActions from './actions';
import {arrayBufferToBase64} from "../utils";
import {ReviewWidget} from "../review-widget/review-widget";
import Review from "../restaurants/review/review";
import {ReviewConstants} from "../restaurants/review/constants";
import {fromJS} from 'immutable';
import {Button, Form} from "react-bootstrap";
import Geosuggest from "react-geosuggest";
import AppActions from "../actions";
import RegisterActions from "../register/actions";
import { Col, Row} from 'react-bootstrap';

class Profile extends React.Component {
  componentDidMount() {
    const {match: {params: {id}}} = this.props;
    this.props.loadUserData(id);
  }

  onChangeUpdateName = event => {
    this.props.checkIsUsernameFree(event.target.value);
    this.props.onChangeValue('updateName', event.target.value)
  };
  onChangeUpdateLocation = value => this.props.onChangeValue('updateLocation', value ? {
    label: value.label,
    location: value.location
  } : null);

  handleUpdateName = (event) => {
    event.preventDefault();
    this.props.onUpdateName();
    this.props.logout();
  }

  handleUpdateLocation = (event) => {
    event.preventDefault();
    this.props.onUpdateLocation();
  }

  showUsernameIndicator = () => this.props.userTaken ? (<Form.Text className="text-danger">
    This username is already in use.
  </Form.Text>) : (<Form.Text className="text-success">
    Username is free!
  </Form.Text>);

  renderUpdateName() {
    const {updateName, userTaken} = this.props;
    console.log(userTaken || updateName == '');
    return (
      <Form onSubmit={this.handleUpdateName}>
        <Form.Group controlId="formPassword">
          <Form.Label>Change name</Form.Label>
          <Form.Control type="text" placeholder="Name" value={updateName} onChange={this.onChangeUpdateName}/>
          {updateName != '' ? this.showUsernameIndicator() : null}
        </Form.Group>
        <Button variant="primary" type="submit" {...((userTaken || updateName == '') && {disabled: true})}>
          Update
        </Button>
      </Form>
    );
  }

  renderUpdateLocation() {
    const {updateLocation} = this.props;
    return (
      <Form onSubmit={this.handleUpdateLocation}>
        <Form.Group controlId="formLocation">
          <Form.Label>Change location</Form.Label>
          <div style={{
            color: 'black',
          }}>
          <Geosuggest onSuggestSelect={this.onChangeUpdateLocation} onChange={() => this.onChangeUpdateLocation(null)}/>
          </div>
        </Form.Group>
        <Button variant="primary" type="submit" {...(updateLocation == null && {disabled: true})}>
          Update
        </Button>
      </Form>
    );
  }

  ProfileHeader() {
    return (
      <div className="profiles-root">
        <div className="profiles-header">
          {this.props.picture.data ? <img
              src={`data:${this.props.picture.contentType};base64,${arrayBufferToBase64(this.props.picture.data.data)}`}
              alt="profile-pic" width="300px"/>
            : null}
          <h2>{this.props.name} </h2>
          <h3>{this.props.location}</h3>
          <Row><Col xs={3}></Col><Col xs={6}>
            {this.props.name === this.props.loggedInUser ? this.renderUpdateName() : null}
          </Col><Col xs={3}></Col></Row><br/>
            {this.props.name === this.props.loggedInUser ? this.renderUpdateLocation() : null}
        </div>
      </div>
    );
  }

  onEdit(review) {
    this.props.onChangeValue('editReview', fromJS(review));
    this.props.onChangeValue('isEditReviewShown', true);
  }

  onDelete(review) {
    this.props.deleteReview(review._id);
  }

  ReviewScroller() {
    return (
      <div className="review-scroll">
        <ScrollPanel style={{width: '100%', height: '400px'}} className="profile-scroll">
          {this.props.reviews.map((review, i) => <ReviewWidget key={i} review={review} showUser={false}
                                                               editDeleteAllowed={this.props.name === this.props.loggedInUser}
                                                               onEdit={this.onEdit.bind(this)}
                                                               onDelete={this.onDelete.bind(this)}></ReviewWidget>)}
        </ScrollPanel>
      </div>
    );
  }

  render() {
    const {match: {params: {id}}} = this.props;
    return (
      <div className="profile-all">
        {!!Object.keys(this.props.editReview).length ? <Review
          show={this.props.isEditReviewShown}
          onHide={() => {
            setTimeout(() => this.props.loadUserData(id), 50);
          }}
          openState={ReviewConstants.OPEN_STATE.EDIT}
          review={this.props.editReview}
        /> : null}

        {this.ProfileHeader()}
        {this.ReviewScroller()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state['profile'].get('name'),
    location: state['profile'].get('location'),
    picture: state['profile'].get('picture').toJS(),
    reviews: state['profile'].get('reviews').toJS(),
    loggedInUser: state['app'].get('username'),
    isEditReviewShown: state['profile'].get('isEditReviewShown'),
    editReview: state['profile'].get('editReview').toJS(),
    updateLocation: state['profile'].get('updateLocation'),
    updateName: state['profile'].get('updateName'),
    userTaken: state['profile'].get('userTaken'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserData: (id) => dispatch(ProfileActions.loadUserData(id)),
    onChangeValue: (name, value) => dispatch(ProfileActions.changeValue(name, value)),
    deleteReview: (reviewId) => dispatch(ProfileActions.deleteReview(reviewId)),
    onUpdateName: () => dispatch(ProfileActions.updateName()),
    onUpdateLocation: () => dispatch(ProfileActions.updateLocation()),
    logout: () => dispatch(AppActions.logout()),
    checkIsUsernameFree: (username) => dispatch(ProfileActions.checkUserExists(username)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
