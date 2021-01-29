import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { createEmployee } from '../actions';

class EmployeesNew extends Component {
  onSubmit = (value) => {
    this.props.createEmployee(value, (employee) => {
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
    const {clientIdValue} = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            label="Empregador (Cliente Pipo)"
            name="client_id"
            type="select"
            component='select'
          >
            <option value='1'>Acme Co</option> 
            <option value='2'>Tio Patinhas Bank</option>
          </Field>
          {`client id:${clientIdValue}`}
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

const selector = formValueSelector('newEmployeeForm');

export default reduxForm({
  form: 'newEmployeeForm' // a unique identifier
})(
  connect( state => ({
    clientIdValue: selector(state, 'client_id')
  }), { createEmployee })(EmployeesNew)
);
