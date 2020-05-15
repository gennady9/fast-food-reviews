import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import AppActions from "./actions";

const mapStateToProps = (state) => {
  return {
    username: state['app'].get('username'),
    loading: state['app'].get('loading'),
    requireAuth: state['app'].get('requireAuth')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRequireAuth: () => dispatch(AppActions.setRequireAuth()),
    loadUsernameAuth: () => dispatch(AppActions.loadUsernameAuth())
  }
};

export default function withAuth(ComponentToProtect) {
  class WithAuth extends Component {
    constructor() {
      super();
    }

    componentDidMount() {
      this.props.loadUsernameAuth();
    }

    render() {
      const {loading, requireAuth} = this.props;
      if (loading) {
        return null;
      }
      if (requireAuth) {
        return <Redirect to="/login"/>;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithAuth);
}
