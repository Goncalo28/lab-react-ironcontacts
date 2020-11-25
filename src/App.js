import React from 'react';
// import './App.css';
import contacts from './contacts.json';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container'
import { flexbox } from '@material-ui/system';
import Box from '@material-ui/core/Box';

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
      <Container>
        <Box display="flex" justifyContent="center">
          <h1>IronContacts</h1>
        </Box>
        <Box display="flex" justifyContent="space-around" >
          <Button variant="contained" color="primary" onClick={this.addRandomContactHandler}>Add Random Contact</Button>
          <Button variant="contained" color="primary" onClick={this.sortByNameHandler}>Sort by name</Button>
          <Button variant="contained" color="primary" onClick={this.sortByPopularityHandler}>Sort by popularity</Button>
        </Box>
        <TableContainer>
          <Table>
              <TableRow>
                <TableCell><h2>Picture</h2></TableCell>
                <TableCell><h2>Name</h2></TableCell>
                <TableCell><h2>Popularity</h2></TableCell>
              </TableRow>
            <TableBody>
                {this.state.contactsArray.map(contact => 
                <TableRow>
                  <TableCell><img src={contact.pictureUrl} style={{width: '10%'}} alt=""/></TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.popularity}</TableCell>
                  <Button variant="contained" color="secondary" onClick={this.deleteByIdHandler}>Delete</Button>
                </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );

  }
}

export default App;
