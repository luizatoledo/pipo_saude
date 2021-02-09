import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, formValueSelector, Fields } from 'redux-form';
import { createEmployee } from '../actions/index';
import { ReduxCheckbox, Checkboxes } from 'react-form-checkbox';
import { fetchClients } from '../actions/index';
import { selectOffers } from '../actions/index';
import { isCPF } from 'brazilian-values';

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

  changeSelectedOffers = (values) => {
    this.props.selectOffers(values);
    this.props.change('selected_offers', values.join("/+/"));  
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
  integer = value => /^[0-9]+$/.test(value) && value > 0 ? undefined : 'Informe um valor numérico positivo sem casas decimais';
  decimal = value => /^[0-9]+\.?[0-9]?$/.test(value) && value > 0 ? undefined : 'Informe um valor numérico positivo com até uma casa decimal no formato XX.X';
  cpfFormValidator = value => /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/.test(value) ? undefined : 'Informe o CPF com 11 dígitos';
  cpfExistence = value => isCPF(value) ? undefined : 'CPF inválido';
  emailFormat = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}(\.?[A-Z]{2,4})?$/i.test(value) ? undefined : 'Formato de e-mail inválido';
  maxHeight = value => value < 300 ? undefined : 'Verifique o valor inserido';
  maxLength = max => value => value.length <= max ? undefined : `Tamanho máximo é de ${max} caracteres`
  nameFromatValidator = value => /^[a-zA-Z\sà-úÀ-ÚçÇêÊ]+$/i.test(value) ? undefined : 'Apenas letras são aceitas no nome'
  
  renderValidations = (fieldName) => {
    const validators = [this.required];
    switch(fieldName) {
      case 'name':
        validators.push(this.string, this.maxLength(50), this.nameFromatValidator);
        return validators;
      case 'cpf':
        validators.push(this.cpfFormValidator, this.cpfExistence);
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
        validators.push(this.integer, this.maxHeight);
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
      const onlyNums = value.replace(/[^\d]/g,'');
      if (onlyNums.length <= 3) {
        return onlyNums;
      } else if (onlyNums.lenghth <= 7) {
        return `${onlyNums.slice(0,3)}.${onlyNums.slice(3)}`
      }
      return `${onlyNums.slice(0,3)}.${onlyNums.slice(3,6)}.${onlyNums.slice(6,9)}-${onlyNums.slice(9,11)}`
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
        <div>
          <h5>Dados dos Benefícios</h5>
          <div className="ml-2 partner-options-labels">
            <Field 
              component={ReduxCheckbox(Checkboxes)}
              data={chosenClient.client_offers.map(p => p.name)} 
              name="available_offers"
              validate={this.required}
            >
            </Field>
          </div>
        </div>
      );
    }
  }

  setSelectedOffers = (chosenPartners) => {
    if(chosenPartners) {
      return(
        <div className="d-none">
          <Field
            name="selected_offers"
            component='input'
            type='text'
          ></Field>
        </div>
      );
    }
  }

  // Function to render fields related to personal data from employees
  renderPersonalFields = (chosenPartners, clients, clientId) => {  
    if (chosenPartners && clientId) {
      // Array of instances of Partners that were displayed for the user, based on the client that the user choose before
      const possiblePartners = clients.find( c => c.client.id === parseInt(clientId,10)).client_offers;
      // Compare the choesen partners names to the options and return the full instances that were chosen
      const chosenPartnersInstances = chosenPartners.map( p => possiblePartners.find(pp => pp.name === p)).filter( a => a !== undefined);
      // Get the registration data needed from all the partners chosen
      const data = chosenPartnersInstances.map( cpi => cpi.registration_data );
      // Merge the arrays of data needed from the different instances of Partner
      if (data.length !== 0) {
        const dataPrint = data.reduce((acc, curr) => acc.concat(curr) );
        // Remove repeated values of data needed
        const infos = dataPrint.filter( (v,i,a) => a.indexOf(v) === i);
        return ( 
          <div>
            <h5>Dados do Beneficiário</h5>
            <div className="ml-2">
              {infos.map( (info, index) => {
                return (
                  <div className={`form-input-personal ${JSON.parse(info).name}`} key={index}>
                    <Field
                      label={JSON.parse(info).label}
                      name={JSON.parse(info).name}
                      type={JSON.parse(info).type}
                      component={this.renderField}
                      validate={this.renderValidations(JSON.parse(info).name)}
                      normalize={this.renderFormattings(JSON.parse(info).name)}
                      placeholder={this.setPlaceholder(JSON.parse(info).name)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      }
    }
  }

  // -------------------- Final Render function ----------------------------
  render() {
    const {clientIdValue, chosenPartners, clients} = this.props;
    return (
      <div className="m-3">
        <header className="d-flex">
          <img src="https://global-uploads.webflow.com/5ee0d13e1d0466f2353dcb99/5ee0d892c8ef9b571403b382_logo.svg" alt="pipo-saude-logo"/>
          <h3 className="ml-5">Formulário para Inclusão de Beneficiário </h3>
        </header>
        <div className="employees-new-form my-2 white-card-shadow p-3">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div className="form-input-client">
              <h5>Dados do Empregador</h5>
              <div className="ml-2">
                { this.renderClientsField(clients) }
              </div>
            </div>
            <div className="form-input-partners mt-3">
              { this.renderPartnersField(clientIdValue, clients)}
              { this.setSelectedOffers(chosenPartners) }
            </div>
            <div className="form-inputs-personal-info mt-3">
              { this.renderPersonalFields(chosenPartners, clients, clientIdValue) }
            </div>
            <div className="send-form-button-container mt-2 d-flex justify-content-center">
              <button className="btn btn-pipo" type="submit" disabled={this.props.pristine || this.props.submitting} onClick={() => this.changeSelectedOffers(chosenPartners)}>
                Registrar Beneficiário
              </button>
            </div>
          </form>
          <Link to={`/`}>Voltar</Link>
        </div>
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
    selectedOffers: state.selectedOffers,
    clientIdValue: selector(state, 'client_id'),
    chosenPartners: selector(state, 'available_offers'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( ( { fetchClients, createEmployee, selectOffers } ) , dispatch);
}

EmployeesNew = connect(mapStateToProps, mapDispatchToProps)(EmployeesNew);

export default reduxForm({
  form: 'newEmployeeForm' // a unique identifier
})(EmployeesNew);
