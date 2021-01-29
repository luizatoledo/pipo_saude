import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { createEmployee } from '../actions';
import { ReduxCheckbox, Checkboxes } from 'react-form-checkbox';

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

  renderPartnersField = (clientId) => {
    const partners = [ 'Plano de Saúde NorteEuropa', 'Plano de Saúde Pampulha Intermédica', 'Plano Dental Sorriso', 'Plano de Saúde Mental Mente Sã, Corpo São'];
    switch(clientId) {
      case '1':
        return (
          <Field component={ReduxCheckbox(Checkboxes)} data={partners} name="partners" />
        );
      case '2':
        return (
          <Field component={ReduxCheckbox(Checkboxes)} data={partners} name="partners" />
        );
    }
  }

  renderPersonalFields = (partners) => {
    const info = [
                   { label: 'Nome', name: 'name', type: 'text'},
                   { label: 'CPF', name: 'cpf',  type: 'text'},
                   { label: 'E-mail', name: 'email',  type: 'text'},
                   { label: 'Endereço', name: 'address',  type: 'text'},
                   { label: 'Data de Admissão', name: 'admission_date', type: 'date'},
                   { label: 'Peso (kg)', name: 'weight',  type: 'number'},
                   { label: 'Altura (cm)', name: 'height',  type: 'number'},
                   { label: 'Horas Meditadas nos Últimos 7 dias', name: 'meditation_hours', type: 'number'}
                  ];

    return info.map (i => {
      return (
        <Field
          label={i.label}
          name={i.name}
          type={i.type}
          component={this.renderField}
        /> 
      )
    });
  }

  render() {
    const {clientIdValue, partners} = this.props;
    
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-input-client">
            <Field
              label="Empregador (Cliente Pipo)"
              name="client_id"
              type="select"
              component='select'
            >
              <option></option>
              <option value='1'>Acme Co</option> 
              <option value='2'>Tio Patinhas Bank</option>
            
            </Field>
          </div>
          <div className="form-input-partners">
            { this.renderPartnersField(clientIdValue) }
          </div>
          <div className="form-inputs-personal-info">
            { this.renderPersonalFields(partners) }
          </div>
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
    clientIdValue: selector(state, 'client_id'),
    partners: selector(state, 'partners')
  }), { createEmployee })(EmployeesNew)
);
