import React, { Component } from 'react';
import API from "./utils/API";
import Wrapper from "./components/Wrapper";
import Card from "./components/Card";
import Title from "./components/Title";
import FilterForm from "./components/FilterForm";
import './App.css';
import EmployeeCard from "./components/EmployeeCard";

class App extends Component {
  state = {
    name_filter: "",
    all_employees: [],
    employees: []
  };

  // When the component mounts, load the next dog to be displayed
  componentDidMount() {
    this.loadRandomUsers();
  }

  loadRandomUsers = () => {
    API.getRandomUsers()
      .then(res =>
        this.setState({
          all_employees: res.data.results,
          employees: res.data.results
        })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const name_filter = this.state.name_filter;
    // Filter this.state.employees for employees with an id not equal to the id being removed
    const employees = this.state.all_employees.filter(employee => {
      const name=`${employee.name.first} ${employee.name.last}`;
      return name.match(RegExp(name_filter));
    });
    /* {{{ **
    ** name_filter = "";
    ** }}} */
    // Set this.state.employees equal to the new employees array
    this.setState({
      ...this.state,
      employees
    });
  };

  render() {
    return (
      <Wrapper>
        <Title>Employee List</Title>
        <Card heading="Filter">
          <FilterForm
            value={this.state.name_filter}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Card>
        {this.state.employees.map(employee => (
          <EmployeeCard
            id={employee.login.uuid}
            key={employee.login.uuid}
            name={`${employee.name.first} ${employee.name.last}`}
            gender={employee.gender}
            email={employee.email}
            phone={employee.phone}
            cell={employee.cell}
            image={employee.picture.medium}
            registered={employee.registered.date}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
