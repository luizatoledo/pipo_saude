import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { createEmployee } from '../actions/index';
import { ReduxCheckbox, Checkboxes } from 'react-form-checkbox';
import { fetchClients } from '../actions/index';
import { fetchClient } from '../actions/index';
import { fetchPartners } from '../actions/index';

class EmployeesNew extends Component {
  componentDidMount() {
    // Initially fill Redux State with clients and partners arrays
    this.props.fetchClients();
    this.props.fetchPartners();
  }

  // Redirect to home page after form submission
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


  // Function to render the dropdown list field to choose the Client that is the employer 
  renderClientsField = (clients) => {
    return (
      <div className="d-flex flex-column">
        <label>Empregador (Cliente Pipo):</label>
        <Field 
          name="client_id"
          type="select"
          component='select'
          id="client-choose"
        >
          <option></option>
          { clients.map( c => {
            return (
              <option value={c.client.id} key={c.client.id}>{c.client.name}</option>
            );
          })}
        </Field>
      </div>
    );
  }

  // Function to render the fields of options of partners
  renderPartnersField = (clientId, partners) => {
    // clientId ? this.props.fetchClient(clientId) : null ;
    // need to find a way to use fetchClient(id) in order to pull information about partners related
    // to the selected client
    console.log(partners);
    // console.log(partners.map(p => p.registration_data.map(d => JSON.parse(d).name));
    switch(clientId) {
      case '12':
        return (
          <Field 
            component={ReduxCheckbox(Checkboxes)}
            data={partners.map(p => p.name)} 
            name="partners" 
          />
        );
      case '5':
        return (
          <Field component={ReduxCheckbox(Checkboxes)} data={partners} name="partners" />
        );
    }
  }

  // Function to render fields related to personal data from employees
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

  // Final Render function
  render() {
    const {clientIdValue, chosenPartners, clients, partners} = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-input-client">
            { this.renderClientsField(clients) }
          </div>
          <div className="form-input-partners">
            { this.renderPartnersField(clientIdValue, partners)}
          </div>
          <div className="form-inputs-personal-info">
            { this.renderPersonalFields(chosenPartners) }
          </div>
          <button className="btn btn-primary" type="submit" disabled={this.props.pristine || this.props.submitting}>
            Registrar Beneficiário
          </button>
        </form>
      </div>
    );
  }
}

// Wiring to Redux Store and Container

// Set selector to get values that users input
const selector = formValueSelector('newEmployeeForm');

function mapStateToProps(state, ownProps) {
  return {
    clients: state.clients,
    partners: state.partners,
    clientIdValue: selector(state, 'client_id'),
    chosenPartners: selector(state, 'partners'),
    client: state.clients.find( c => c.id === parseInt(state.clientIdValue, 10))
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( ( { fetchClient, fetchPartners, fetchClients, createEmployee } ) , dispatch);
}

EmployeesNew = connect(mapStateToProps, mapDispatchToProps)(EmployeesNew)

export default reduxForm({
  form: 'newEmployeeForm' // a unique identifier
})(EmployeesNew);
