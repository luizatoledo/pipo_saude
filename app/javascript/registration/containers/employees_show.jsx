import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectOffers } from '../actions/index';
import { fetchEmployee } from '../actions/index';

class EmployeesShow extends Component {
  componentDidMount() {
    this.props.fetchEmployee(this.props.match.params.id);
  }

  render() {
    return (
      <div className="container my-3">
        <div className="title-employee-show d-flex flex-column align-items-center py-3">
          <h2>Fichas geradas para {this.props.employee.name}</h2>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    employee: state.employees.find((e) => {
      return e.id === parseInt(ownProps.match.params.id)
    })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEmployee, selectOffers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesShow);