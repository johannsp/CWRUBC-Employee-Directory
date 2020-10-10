import React, { Component } from 'react';
import API from "./utils/API";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import './App.css';
import EmployeeCard from "./components/EmployeeCard";

class App extends Component {
  state = {
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
          employees: res.data.results
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Wrapper>
        <Title>Employee List</Title>
        {this.state.employees.map(employee => (
          <EmployeeCard
            id={employee.id.value}
            key={employee.id.value}
            name={`${employee.name.first} ${employee.name.last}`}
            image={employee.picture.medium}
            registered={employee.registered.date.toString()}
            gender={employee.gender}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
