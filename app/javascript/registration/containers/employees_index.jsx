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
    return this.props.employees.map((employee) => {
      return (
        <Link to={`/employees/${employee.id}`} key={employee.id}>
          <div className="employee-item">
            <h3>{employee.title}</h3>
            <p>{employee.content}</p>
          </div>
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="first-row">
          <h3>Lista de Beneficiários</h3>
          <Link className="btn btn-primary btn-cta" to="/employees/new">
            Registrar Novo Beneficário
          </Link>
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