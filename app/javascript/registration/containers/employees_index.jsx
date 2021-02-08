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
    return this.props.employees.map((e, i) => {
      return (
        <div className="employee-item white-card-shadow d-flex my-2" key={i}>
          <p className="p-1">{`${i+1}. ${e.attributes.name ? e.attributes.name : 'Sem registro de nome'}`}</p>
          <p className="p-1"><a href={`/employees/${e.attributes.id}`} className='link-to-tables'>Ver tabelas</a></p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="m-3">
        <header className="d-flex justify-content-between">
          <img src="https://global-uploads.webflow.com/5ee0d13e1d0466f2353dcb99/5ee0d892c8ef9b571403b382_logo.svg" alt="pipo-saude-logo"/>
          <Link className="btn btn-pipo" to="/employees/new">
            Registrar Novo Beneficiário
          </Link>
        </header>
        <div className="employees-index-container my-3 pl-2">
        <div className="title-employees-index">
          <h3 className="pt-1">Lista de Beneficiários</h3>
        </div>
        {this.renderEmployees()}
        </div>
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