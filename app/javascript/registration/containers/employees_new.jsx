import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { createEmployee } from '../actions/index';
import { ReduxCheckbox, Checkboxes } from 'react-form-checkbox';
import { fetchClients } from '../actions/index';

class EmployeesNew extends Component {
  componentDidMount() {
    this.props.fetchClients();
  }

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

  renderClientsField = (clients) => {
    return (
      <div className="d-flex flex-column">
        <label>Empregador (Cliente Pipo):</label>
        <Field 
          name="client_id"
          type="select"
          component='select'
        >
          <option></option>
          { clients.map( c => {
            return (
              <option value={c.id} key={c.id}>{c.name}</option>
            );
          })}
        </Field>
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
    const infos = [
                   { label: 'Nome', name: 'name', type: 'text'},
                   { label: 'CPF', name: 'cpf',  type: 'text'},
                   { label: 'E-mail', name: 'email',  type: 'text'},
                   { label: 'Endereço', name: 'address',  type: 'text'},
                   { label: 'Data de Admissão', name: 'admission_date', type: 'date'},
                   { label: 'Peso (kg)', name: 'weight',  type: 'number'},
                   { label: 'Altura (cm)', name: 'height',  type: 'number'},
                   { label: 'Horas Meditadas nos Últimos 7 dias', name: 'meditation_hours', type: 'number'}
                  ];

    return infos.map( (info, index) => {
      return (
        <div className={`form-input-${info.name}`} key={index}>
          <Field
            label={info.label}
            name={info.name}
            type={info.type}
            component={this.renderField}
          />
        </div>
      )
    });
  }

  render() {
    const {clientIdValue, partners} = this.props;
    const clients = this.props.clients;
    
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-input-client">
            { this.renderClientsField(clients) }
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

function mapStateToProps(state) {
  return {
    clients: state.clients,
    clientIdValue: selector(state, 'client_id'),
    partners: selector(state, 'partners')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( ( { fetchClients, createEmployee } ) , dispatch);
}

EmployeesNew = connect(mapStateToProps, mapDispatchToProps)(EmployeesNew)

export default reduxForm({
  form: 'newEmployeeForm' // a unique identifier
})(EmployeesNew);
