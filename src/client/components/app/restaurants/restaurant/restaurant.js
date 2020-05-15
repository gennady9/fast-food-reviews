import React from 'react';
import {connect} from 'react-redux';
import {ScrollPanel} from 'primereact/scrollpanel';
import {Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import RestaurantActions from "./actions";
import Review from "../review/review";
import {ReviewConstants} from "../review/constants";
import {ReviewWidget} from "../../review-widget/review-widget";
import Form from "react-bootstrap/es/Form";

class Restaurant extends React.Component {
  componentDidMount() {
    const {match: {params: {id}}} = this.props;
    this.props.loadRestaurant(id);
  }

  RestaurantHeader() {
    const {name, location} = this.props;
    return (
      <div className="restaurants-root">
        <div className="restaurants-header">
          <h2>{name}</h2>
          <h3>{location}</h3> 
          <Button variant="secondary" onClick={this.props.showAddReview}>Write review</Button>
        </div>
      </div>
    );
  }

  ReviewScroller() {
    const {match: {params: {id}}} = this.props;
    return (
      <div className="review-scroll">
        <Review
          show={this.props.isAddReviewShown}
          onHide={() => {
            setTimeout(() => this.props.loadRestaurant(id), 50);
          }}
          openState={ReviewConstants.OPEN_STATE.NEW}
          restaurantId={this.props.id}
        />
        <ToggleButtonGroup type="radio" name={'sort'} defaultValue={'creationTime'}
                           onChange={value => this.props.sortReviewsBy(value)}>
          <ToggleButton value={'creationTime'}>Creation time</ToggleButton>
          <ToggleButton value={'bathroomQuality'}>Bathroom Quality</ToggleButton>
          <ToggleButton value={'staffKindness'}>Staff Kindness</ToggleButton>
          <ToggleButton value={'cleanliness'}>Cleanliness</ToggleButton>
          <ToggleButton value={'driveThruQuality'}>Drive-thru quality</ToggleButton>
          <ToggleButton value={'deliverySpeed'}>Delivery Speed</ToggleButton>
          <ToggleButton value={'foodQuality'}>Food Quality</ToggleButton>
        </ToggleButtonGroup>
        <ScrollPanel style={{width: '100%', height: '500px'}} className="restaurant_scroll">
          {this.props.reviews.map((review, i) => <ReviewWidget key={i} review={review} showUser={true}></ReviewWidget>)}
        </ScrollPanel>
      </div>
    );
  }

  render() {
    return (
      <div className="restaurant-all">
        {this.RestaurantHeader()}
        {this.ReviewScroller()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state['restaurant'].get('name'),
    location: state['restaurant'].get('location'),
    isAddReviewShown: state['restaurant'].get('isAddReviewShown'),
    reviews: state['restaurant'].get('reviews').toJS(),
    id: state['restaurant'].get('id'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRestaurant: (id) => dispatch(RestaurantActions.loadRestaurant(id)),
    showAddReview: () => dispatch(RestaurantActions.showAddReview()),
    sortReviewsBy: (value) => dispatch(RestaurantActions.sortReviews(value))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
