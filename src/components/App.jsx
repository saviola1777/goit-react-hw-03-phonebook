import { nanoid } from "nanoid";
import React from 'react';

import Cointeiner from 'components/Cointeiner/Cointeiner';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  }
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts) {
      this.setState({ contacts })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts))
    }
  }

  deleteContact = id => {
    this.setState(prevState => {
      const removeContact = prevState.contacts.filter(contact => contact.id !== id);
      return { contacts: removeContact };
    });
  };

  addContact = ({ name, number }) => {
    this.setState(prevState => {
      const { contacts } = prevState;
      if (this.isDublication(name)) {
        return alert(`${name} is already in contacts!`)
      }
      const newContact = {
        id: nanoid(3),
        name,
        number,
      }
      return { contacts: [newContact, ...contacts] }
    })
  }

  isDublication(name) {
    const normalizeName = name.toLowerCase()
    const { contacts } = this.state
    const nameContact = contacts.find(({ name }) => {
      return (normalizeName === name.toLowerCase())
    })
    return Boolean(nameContact)
  }

  onHendleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  getFilteredContact() {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const result = contacts.filter(({ name }) => {
      return (name.toLocaleLowerCase().includes(normalizedFilter))
    })
    return result
  }

  render() {
    const { deleteContact, onHendleChange, addContact } = this;
    const contacts = this.getFilteredContact();
    console.log(this.state.contacts)
    return (

      <Cointeiner>
        <h2>Phonebook</h2>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter onHendleChange={onHendleChange} />
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      </Cointeiner>

    )
  }
}
export default App

