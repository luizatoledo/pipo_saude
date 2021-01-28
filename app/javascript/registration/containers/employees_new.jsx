import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createEmployee } from '../actions';

class EmployeesNew extends Component {
  onSubmit = (info) => {
    this.props.createEmployees(info, (employee) => {
      this.props.history.push('/');
      return employee;
    });
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            label="Nome"
            name="name"
            type="text"
            component={this.renderField}
          />
          <Field
            label="CPF"
            name="cpf"
            type="text"
            component={this.renderField}
          />
          <Field
            label="E-mail"
            name="email"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Endereço"
            name="address"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Empregador (Cliente Pipo)"
            name="cliend_id"
            type="text"
            component={this.renderField}
          />
          <Field
            label="Data de Admissão"
            name="admission_date"
            type="date"
            component={this.renderField}
          />
          <Field
            label="Peso em kg"
            name="weight"
            type="number"
            component={this.renderField}
          />
          <Field
            label="Altura em cm"
            name="height"
            type="number"
            component={this.renderField}
          />
          <Field
            label="Horas Medidatas nos Últimos 7 dias"
            name="meditation_hours"
            type="number"
            component={this.renderField}
          />
          <button className="btn btn-primary" type="submit" disabled={this.props.pristine || this.props.submitting}>
            Registrar Beneficiário
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'newEmployeeForm' // a unique identifier
})(
  connect(null, { createEmployee })(EmployeesNew)
);
