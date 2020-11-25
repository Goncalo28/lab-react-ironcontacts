import React from 'react';
import './App.css';
import contacts from './contacts.json';


class App extends React.Component {
  state = {
    contactsArray: contacts.slice(0, 5)
  }

  addRandomContactHandler = () => {
    let newArray = [...this.state.contactsArray];
    let random = contacts[Math.floor(Math.random() * contacts.length)];
    newArray.push(random);
    this.setState({
      contactsArray: newArray,
    });
  };
  sortByNameHandler = () => {
    let arraySortedByName = [
      ...this.state.contactsArray.sort((a, b) => a.name.localeCompare(b.name)),
    ];
    this.setState({
      contactsArray: arraySortedByName,
    });
  };
  sortByPopularityHandler = () => {
    let arraySortedByPopularity = [
      ...this.state.contactsArray.sort((a, b) => b.popularity - a.popularity),
    ];
    this.setState({
      contactsArray: arraySortedByPopularity,
    });
  };

  deleteByIdHandler = (id) => {
    let copiedArray = [...this.state.contactsArray]
    let contactIndexToRemove = copiedArray.findIndex(item => item.id === id);
    copiedArray.splice(contactIndexToRemove, 1)

    this.setState({
      contactsArray: copiedArray,
    })
  }


  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.addRandomContactHandler}>Add Random Contact</button>
        <button onClick={this.sortByNameHandler}>Sort by name</button>
        <button onClick={this.sortByPopularityHandler}>Sort by popularity</button>
        <table>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
            </tr>
          <tbody>
              {this.state.contactsArray.map(contact => 
              <tr>
                <td><img src={contact.pictureUrl} style={{width: '10%'}} alt=""/></td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <button onClick={this.deleteByIdHandler}>Delete</button>
              </tr>)}
          </tbody>
        </table>
      </div>
    );

  }
}

export default App;
