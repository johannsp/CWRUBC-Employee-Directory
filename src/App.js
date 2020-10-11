import React, { Component, useRef } from 'react';
import API from "./utils/API";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import './App.css';
import EmployeeCard from "./components/EmployeeCard";

class App extends Component {
  inputRef = useRef();
  state = {
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

  handleSubmit = e => {
    // Filter this.state.employees for employees with an id not equal to the id being removed
    const employees = this.state.all_employees.filter(employee => {
      const name=`${employee.name.first} ${employee.name.last}`;
      return name.match(RegExp(this.inputRef.current.value));
    });
    // Set this.state.employees equal to the new employees array
    this.setState({
      ...this.state,
      employees
    });
    this.inputRef.current.value = "";
  };

  render() {
    return (
      <Wrapper>
        <Title>Employee List</Title>
        <form className="form-group mt-5" onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            ref={this.inputRef}
            placeholder="Name contains..."
          />
          <button className="btn btn-success mt-3 mb-5" type="submit">
            Filter by name
          </button>
        </form>
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
