import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectOffers } from '../actions/index';

class EmployeesShow extends Component {
  renderHeadings = (infos) => {
    return(
      infos.map( (i,index) => {
        return(
          <th scope='col' key={index}>{JSON.parse(i).label}</th>
        );
      })
    );
  }

  renderContent = (infos, employee) => {
    return (
      infos.map( (info,i) => {
        return(
          <td key={i}>{employee[JSON.parse(info).name]}</td>
        );
      })
    );
  }

  renderTables = (offers, employee) => {
    const selectedOffers = employee.selected_offers.split(",");
    const selectedOffersInstances = selectedOffers.map((off) => {
      return(offers.map(offer => offer.name === off ? offer : null ).filter(e => e));
    }).flat();
    return(
      <div>
        {selectedOffersInstances.map( (o) => {
          return(
            <div key={o.id}>
              <h3 className="mt-5">Ficha de inclusão {o.name}</h3>
              <div className='table-responsive-sm white-card-shadow'>
                <table className='table'>
                  <thead className="thead-light">
                    <tr>
                      {this.renderHeadings(o.registration_data)}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {this.renderContent(o.registration_data, employee)}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const {employee} = this.props;
    return (
      <div className="container my-3">
        <div className="title-employee-show d-flex flex-column align-items-center py-3">
          <h2>Fichas geradas para {employee.attributes.name}</h2>
        </div>
        { this.renderTables(employee.available_offers, employee.attributes)}
        <Link to={`/`}>Voltar</Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    employee: state.employees.find((e) => {
      return e.attributes.id === parseInt(ownProps.match.params.id)
    })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectOffers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesShow);