import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { createEmployee } from '../actions/index';
import { ReduxCheckbox, Checkboxes } from 'react-form-checkbox';
import { fetchClients } from '../actions/index';

class EmployeesNew extends Component {
  componentDidMount() {
    // Initially fill Redux State with clients array
    this.props.fetchClients();
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
  renderPartnersField = (clientId, clients) => {
    const chosenClient = clients.find( c => c.client.id === parseInt(clientId,10));
    if (clientId) {
      return (
        <Field 
          component={ReduxCheckbox(Checkboxes)}
          data={chosenClient.client_partners.map(p => p.name)} 
          name="partners"
        />
      );
    }
  }

  // Function to render fields related to personal data from employees
  renderPersonalFields = (chosenPartners, clients, clientId) => {  
    if (chosenPartners && clientId) {
      // Array of instances of Partners that were displayed for the user, based on the client that the user choose before
      const possiblePartners = clients.find( c => c.client.id === parseInt(clientId,10)).client_partners;
      // Compare the choesen partners names to the options and return the full instances that were chosen
      const chosenPartnersInstances = chosenPartners.map( p => possiblePartners.find(pp => pp.name === p)).filter( a => a !== undefined);
      // Get the registration data needed from all the partners chosen
      const data = chosenPartnersInstances.map( cpi => cpi.registration_data );
      // Merge the arrays of data needed from the different instances of Partner
      if (data.length !== 0) {
        console.log(data);
        const dataPrint = data.reduce((acc, curr) => acc.concat(curr) );
        // Remove repeated values of data needed
        const infos = dataPrint.filter( (v,i,a) => a.indexOf(v) === i);
        console.log(infos);
        return infos.map( (info, index) => {
          return (
            <div className={`form-input-${JSON.parse(info).name}`} key={index}>
              <Field
                label={JSON.parse(info).label}
                name={JSON.parse(info).name}
                type={JSON.parse(info).type}
                component={this.renderField}
              />
            </div>
          )
        });
      }
    }
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
            { this.renderPartnersField(clientIdValue, clients)}
          </div>
          <div className="form-inputs-personal-info">
            { this.renderPersonalFields(chosenPartners, clients,clientIdValue) }
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
    clientIdValue: selector(state, 'client_id'),
    chosenPartners: selector(state, 'partners'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( ( { fetchClients, createEmployee } ) , dispatch);
}

EmployeesNew = connect(mapStateToProps, mapDispatchToProps)(EmployeesNew)

export default reduxForm({
  form: 'newEmployeeForm' // a unique identifier
})(EmployeesNew);
