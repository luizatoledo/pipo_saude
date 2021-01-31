import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEmployees } from '../actions/index';

class EmployeesIndex extends Component {
  componentDidMount() {
    this.props.fetchEmployees();
  }

  renderEmployees = () => {
    return this.props.employees.map((employee, i) => {
      return (
        <Link to={`/employees/${employee.id}`} key={employee.id}>
          <div className="employee-item py-3">
            <h3>{`${i+1}.${employee.name}`}</h3>
            <p>{employee.client_id}</p>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <div className="m-3">
        <header className="d-flex justify-content-between">
          <img src="https://global-uploads.webflow.com/5ee0d13e1d0466f2353dcb99/5ee0d892c8ef9b571403b382_logo.svg" alt="pipo-saude-logo"/>
          <Link className="btn btn-pipo" to="/employees/new">
            Registrar Novo Beneficário
          </Link>
        </header>
        <div className="title-employees-index">
          <h3 className="pt-4">Lista de Beneficiários</h3>
        </div>
        {this.renderEmployees()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: state.employees
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEmployees }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesIndex);