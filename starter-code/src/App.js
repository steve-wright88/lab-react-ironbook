import React from "react";
import users from "./users";
import linkedinImg from "./linkedin.png";

import "./App.css";

class App extends React.Component {
  state = {
    users: users,
    search: "",
    teacher: true,
    student: true
  };

  displayUsers = () => {
    return this.state.users
      .filter(
        user =>
          user.lastName.toLowerCase().startsWith(this.state.search) ||
          user.firstName.toLowerCase().startsWith(this.state.search)
      )
      .filter(user => {
        return this.state[user.role];
      })
      .map(el => {
        return (
          <tr key={el.firstName.concat(el.lastName)}>
            <td>{el.firstName}</td>
            <td>{el.lastName}</td>
            <td>{el.campus}</td>
            <td>{el.role}</td>
            <td>
              {el.linkedin !== undefined && (
                <a href={el.linkedin}>
                  <img src={linkedinImg} alt="" />
                </a>
              )}
            </td>
          </tr>
        );
      });
  };

  searchBar = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleCheckboxChange = event => {
    const { name, checked } = event.target;

    this.setState({
      [name]: checked
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Iron Book</h1>
        <div className="filter">
          <form onSubmit={this.searchBar}>
            <input
              type="text"
              name="search"
              autoComplete="off"
              id="search"
              value={this.state.search}
              onChange={this.searchBar}
            />
            <label htmlFor="isStudent">Student</label>
            <input
              type="checkbox"
              name="student"
              id="isStudent"
              checked={this.state.student}
              onChange={this.handleCheckboxChange}
            />
            <label htmlFor="isTeacher">Teacher</label>
            <input
              type="checkbox"
              name="teacher"
              id="isTeacher"
              checked={this.state.teacher}
              onChange={this.handleCheckboxChange}
            />
          </form>
        </div>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
            {this.displayUsers()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

// onHandleChange = event => {
//   this.setState({ filter: event.target.value });
// };
