import React from 'react';
import './restaurants.scss';
import {connect} from 'react-redux';
import {
  Col,
  Row,
  Container,
  Button,
  Form,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Table from 'react-bootstrap/Table'
import AddRestaurant from "./add-restaurant/add-restaurant";
import RestaurantsActions from './actions'
import {Typeahead} from "react-bootstrap-typeahead";
import Slider from '@material-ui/core/Slider';
import {withStyles, makeStyles} from '@material-ui/core/styles';

const CustomSlider = withStyles({
  root: {
    color: '#0080ff',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

class Restaurants extends React.Component {
  componentDidMount() {
    this.props.loadAllRestaurants();
  }

  restaurantTable = () => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Location</th>
          <th>Average Rating</th>
          <th>Distance from you (Meters)</th>
        </tr>
        </thead>
        <tbody>
        {this.props.searchResults.map((restaurant, i) => this.renderSearchResult(i + 1, restaurant.id, restaurant.name, restaurant.location ? restaurant.location.location : '', restaurant.rankAverage, restaurant.distance))}
        </tbody>
      </Table>
    );
  };

  renderSearchResult(index, id, name, location, averageRank, distance) {
    return (
      <tr key={id}>
        <td>{index}</td>
        <td><Button variant="link" onClick={() => this.props.history.push(`/restaurants/${id}`)}>{name}</Button></td>
        <td>{location}</td>
        <td>{averageRank}</td>
        <td>{distance}</td>
      </tr>
    );
  }

  renderSearchPanel() {
    return (<>
        <h2>Search restaurants</h2>
        {this.props.isAdvancedSearch ? this.renderAdvancedSearch() : this.renderBasicSearch()}
        <ToggleButtonGroup type="radio" name={'isAdvancedSearch'} defaultValue={false}
                           onChange={value => value ? this.props.setAdvancedSearch() : this.props.setBasicSearch()}>
          <ToggleButton value={false}>Basic search</ToggleButton>
          <ToggleButton value={true}>Advanced search</ToggleButton>
        </ToggleButtonGroup>
      </>
    );
  }

  handleBasicSearch = (event) => {
    event.preventDefault();
    this.props.basicSearch();
  }

  handleAdvancedSearch = (event) => {
    event.preventDefault();
    this.props.advancedSearch();
  }

  renderBasicSearch() {
    return (
      <Form onSubmit={this.handleBasicSearch}>
        <Typeahead
          id="basicName"
          placeholder="Restaurant name"
          value={name}
          onInputChange={val => this.props.onChangeValue('basicSearchName', val)}
          onChange={val => val[0] ? this.props.onChangeValue('basicSearchName', val[0].label) : null}
          options={this.props.restaurants.map(restaurant => ({label: restaurant.name, id: restaurant._id}))}
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    );
  }

  renderAdvancedSearch() {
    return (
      <Form onSubmit={this.handleAdvancedSearch}>
        <Form.Group controlId="formRestaurantName">
          <Form.Control type="text"
                        placeholder="Restaurant's name"
                        value={this.props.advancedSearchName}
                        onChange={(value) => this.props.onChangeValue('advancedSearchName', value.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formRestaurantLocation">
          <Form.Control type="text"
                        placeholder="Location"
                        value={this.props.advancedSearchLocation}
                        onChange={(value) => this.props.onChangeValue('advancedSearchLocation', value.target.value)}/>
        </Form.Group>
        <Form.Group>
          <div key="inline-checkbox" className="mb-3">
            <Form.Check inline label="By name" type="checkbox" id="inline-checkbox-1"
                        value={this.props.advancedSearchNameEnabled}
                        onChange={(value) => this.props.onChangeValue('advancedSearchNameEnabled', value.target.checked)}/>
            <Form.Check inline label="By location" type="checkbox" id="inline-checkbox-2"
                        value={this.props.advancedSearchLocationEnabled}
                        onChange={(value) => this.props.onChangeValue('advancedSearchLocationEnabled', value.target.checked)}/>
          </div>
        </Form.Group>
        <Form.Group controlId="form.select">
          <Form.Label>Rank above</Form.Label>
          <Form.Control as="select" value={this.props.rankAbove}
                        onChange={(e) => this.props.onChangeValue('rankAbove', e.target.value)}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    );
  }

  render() {
    return (
      <div className="restaurants-root">
        <AddRestaurant
          show={this.props.isAddRestaurantShown}
          onHide={() => {
            this.props.loadAllRestaurants();
            this.props.hideAddRestaurant();
          }
          }
        />
        <Router>
          <div className="restaurants-header">
            <Row>
              <Col xs={6}>
                {this.renderSearchPanel()}
              </Col>
              <Col xs={6}>
                <h2>Can't find a restaurant?</h2>
                <Button variant="primary" onClick={this.props.showAddRestaurant}>Add restaurant</Button>
                <Form.Group>
                  <Form.Label><h4>Rating - Distance</h4></Form.Label>
                  <CustomSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0}
                                onChange={(e, value) => this.props.sortRestaurants(value)}/>
                </Form.Group>
              </Col>
            </Row>
          </div>
          {this.restaurantTable()}

          <Container className='content-container'>
          </Container>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAddRestaurantShown: state['restaurants'].get('isAddRestaurantShown'),
    isAdvancedSearch: state['restaurants'].get('isAdvancedSearch'),
    advancedSearchName: state['restaurants'].get('advancedSearchName'),
    advancedSearchLocation: state['restaurants'].get('advancedSearchLocation'),
    basicSearchName: state['restaurants'].get('basicSearchName'),
    restaurants: state['restaurants'].get('restaurants').toJS(),
    searchResults: state['restaurants'].get('searchResults').toJS(),
    rankAbove: state['restaurants'].get('rankAbove'),
    advancedSearchNameEnabled: state['restaurants'].get('advancedSearchNameEnabled'),
    advancedSearchLocationEnabled: state['restaurants'].get('advancedSearchLocationEnabled'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    showAddRestaurant: () => dispatch(RestaurantsActions.showAddRestaurant()),
    hideAddRestaurant: () => dispatch(RestaurantsActions.hideAddRestaurant()),
    setAdvancedSearch: () => dispatch(RestaurantsActions.setAdvancedSearch()),
    setBasicSearch: () => dispatch(RestaurantsActions.setBasicSearch()),
    onChangeValue: (name, value) => dispatch(RestaurantsActions.changeValue(name, value)),
    loadAllRestaurants: () => dispatch(RestaurantsActions.loadAllRestaurants()),
    basicSearch: () => dispatch(RestaurantsActions.basicSearch()),
    advancedSearch: () => dispatch(RestaurantsActions.advancedSearch()),
    sortRestaurants: (rankDistance) => dispatch(RestaurantsActions.sortRestaurants(rankDistance))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
