import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, SubmissionError } from 'redux-form';
import { createEmployee } from '../actions/index';
import { ReduxCheckbox, Checkboxes } from 'react-form-checkbox';
import { fetchClients } from '../actions/index';

class EmployeesNew extends Component {

  // -------------------- Component LifeCycle-----------------------------  
  componentDidMount() {
    // Initially fill Redux State with clients array
    this.props.fetchClients();
  }
  // ----------------------------------------------------------------------  

  //  -------------------- Event Handling of Inputs -----------------------
  // Redirect to home page after form submission
  onSubmit = (value) => {
    this.props.createEmployee(value, (employee) => {
      this.props.history.push('/');
      return employee;
    });
  }
  // ----------------------------------------------------------------------  

  // ------------------------- Field Rendering ----------------------------
  // Render form inputs with a specific formatting
  renderField({input, label, type, meta: {touched, error, warning}, placeholder}) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          {...input}
          placeholder={placeholder}
        />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    );
  }

  // Functions to Field Validation
  required = value => value ? undefined : 'Campo Obrigatório';
  string = value => typeof(value) === 'string' ? undefined : 'Esse campo só aceita texto';
  integer = value => /^[0-9]+$/.test(value) ? undefined : 'Informe um valor numérico sem casas decimais';
  decimal = value => /^[0-9]+\.[0-9]$/.test(value) ? undefined : 'Informe um valor numérico com até uma casa decimal no formato XX.X';
  cpfValidator = value => /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/.test(value) ? undefined : 'Informe o CPF com 11 dígitos';
  emailFormat = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined : 'Formato de e-mail inválido';
  maxHeight = value => value < 300 ? undefined : 'Verifique o valor inserido';
  
  renderValidations = (fieldName) => {
    const validators = [this.required];
    switch(fieldName) {
      case 'name':
        validators.push(this.string);
        return validators;
      case 'cpf':
        validators.push(this.cpfValidator);
        return validators;
      case 'admission_date':
        return validators;
      case 'email':
        validators.push(this.emailFormat);
        return validators;
      case 'weight':
        validators.push(this.decimal);
        return validators;
      case 'height':
        validators.push(this.integer);
        return validators;
      case 'address':
        return validators;
      case 'meditation_hours':
        return validators;
    }
  }

  // Functions to Field Formatting
    cpfFormatting = (value) => {
      if (!value) return;
      const formattedInput = value.replace(/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/, `$1.$2.$3-$4`);
      return formattedInput;
    }

    renderFormattings = (fieldName) => {
      switch(fieldName) {
        case 'cpf':
          return this.cpfFormatting;
      }
    }

  // Functions to Field Placeholders
    setPlaceholder = (fieldName) => {
      switch(fieldName) {
        case 'name':
          return "Nome do beneficiário";
        case 'cpf':
          return "CPF do beneficiário";
        case 'email':
          return "E-mail do beneficiário";
        case 'weight':
          return "Peso do beneficiário em kg";
        case 'height':
          return "Altura do beneficiário em cm";
        case 'address':
          return "Endereço do beneficiário";
        case 'meditation_hours':
          return "Total de horas";
      }
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
          <option value='' disabled>Escolha uma opção</option>
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
          validate={this.required}
        >
        </Field>
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
        const dataPrint = data.reduce((acc, curr) => acc.concat(curr) );
        // Remove repeated values of data needed
        const infos = dataPrint.filter( (v,i,a) => a.indexOf(v) === i);
        return infos.map( (info, index) => {
          return (
            <div className={`form-input-${JSON.parse(info).name}`} key={index}>
              <Field
                label={JSON.parse(info).label}
                name={JSON.parse(info).name}
                type={JSON.parse(info).type}
                component={this.renderField}
                validate={this.renderValidations(JSON.parse(info).name)}
                format={this.renderFormattings(JSON.parse(info).name)}
                placeholder={this.setPlaceholder(JSON.parse(info).name)}
              />
            </div>
          )
        });
      }
    }
  }

  // -------------------- Final Render function ----------------------------
  render() {
    const {clientIdValue, chosenPartners, clients} = this.props;
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
// ---------------------------------------------------------------------------

// ------------------- Wiring to Redux Store and Container ------------------- 

// Set selector to get values that users input
const selector = formValueSelector('newEmployeeForm');

function mapStateToProps(state) {
  return {
    clients: state.clients,
    clientIdValue: selector(state, 'client_id'),
    chosenPartners: selector(state, 'partners'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( ( { fetchClients, createEmployee } ) , dispatch);
}

EmployeesNew = connect(mapStateToProps, mapDispatchToProps)(EmployeesNew);

export default reduxForm({
  form: 'newEmployeeForm' // a unique identifier
})(EmployeesNew);
