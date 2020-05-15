import React from 'react';
import './app.scss';
import {connect} from 'react-redux';
import {Navbar, Nav, NavDropdown, Col, Row, Image, Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import AppActions from './actions';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import withAuth from './with-auth';
import Register from './register/register';
import Login from './login/login';
import Profiles from './profiles/profiles';
import Profile from './profile/profile';
import Restaurants from './restaurants/restaurants';
import Restaurant from './restaurants/restaurant/restaurant';

function Index() {
  return (
    <div className="app-content">
      <h2>Welcome {this.props.username}!</h2>
    </div>
  );
}

class App extends React.Component {
  componentDidMount() {
    this.props.loadUsername();
  }

  isAuthenticated = () => this.props.username != null && this.props.username != '';

  renderUserDropdownMenu = () => (
    <div>
      <Nav><NavDropdown title={`Hello ${this.props.username}`} id="collasible-nav-dropdown">
        <LinkContainer key={1} to={`/profiles/${this.props.userId}`}>
          <NavDropdown.Item>Profile</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
      </NavDropdown></Nav>
    </div>);

  renderGuestDropdownMenu = () => (<Nav>
    <LinkContainer key={2} to='/register'>
      <Nav.Link><h1>Register</h1></Nav.Link>
    </LinkContainer>
    <LinkContainer key={3} to='/login'>
      <Nav.Link><h1>Login</h1></Nav.Link>
    </LinkContainer>
  </Nav>);

  renderMenu = () => [
    <LinkContainer key={4} to='/' exact>
      <Nav.Link>Main</Nav.Link>
    </LinkContainer>,
    <LinkContainer key={5} to='/restaurants'>
      <Nav.Link>Restaurants</Nav.Link>
    </LinkContainer>,
    <LinkContainer key={6} to='/profiles'>
      <Nav.Link>Users</Nav.Link>
    </LinkContainer>
  ];

  render() {
    return (
      <div className="app-root">
        <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/"> <img src={require("./../../util/images/logo.png")} width="200" height="125"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {this.isAuthenticated() ? this.renderMenu() : null}
              </Nav>
              {this.isAuthenticated() ? this.renderUserDropdownMenu() : this.renderGuestDropdownMenu()}
            </Navbar.Collapse>
          </Navbar>

          <Container className='content-container'>
            <Switch>
              <Route path="/" exact component={withAuth(Index.bind(this))}/>
              <Route path="/login/" component={Login}/>
              <Route path="/register/" component={Register}/>
              <Route path="/restaurants/" exact component={withAuth(Restaurants)}/>
              <Route path="/restaurants/:id" exact component={withAuth(Restaurant)}/>
              <Route path="/profiles/" exact component={withAuth(Profiles)}/>
              <Route path="/profiles/:id" exact component={withAuth(Profile)}/>
            </Switch>
          </Container>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state['app'].get('username'),
    userId: state['app'].get('userId')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsername: () => dispatch(AppActions.loadUsernameAuth()),
    logout: () => dispatch(AppActions.logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
