import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEmployee } from '../actions/index';

class EmployeesShow extends Component {
  componentDidMount() {
    this.props.fetchEmployee(this.props.match.params.id);
  }

  render() {
    const { employee } = this.props;

    if (!employee) {
      return <p>Buscando beneficiário...</p>;
    }

    return (
      <div>
        <div className="employee-item">
          <h3>{employee.name}</h3>
          <p>{employee.client_id}</p>
        </div>
        <Link to="/">
          Back
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    employee: state.employees.find((employee) => {
      return employee.id === parseInt(ownProps.match.params.id)
    })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEmployee }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesShow);
