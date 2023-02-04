import PropTypes from "prop-types";
import css from "components/ContactForm/ContactForm.module.css"
import React from 'react';
// import inititalState from 'components/ContactForm/inititalState'   тут ми можемо зберігати наші обєкти такі як name , number
class ContactForm extends React.Component {
  state = {
    name: '',                            //могли б просто розпилити наш inititalState малоб бути  state={...inititalState} а далі коли міняється стейт міняються і дані в ньому
    number: '',
  } 
  onHendleSubmit = (e) => {             
    e.preventDefault();                           //при сабміті не перезагружає
    const { addContact } = this.props;            //передаємо мій  пропс
    addContact({ ...this.state })                //в мій проп ми розпилюємо тещо знаходиться в цьому стейті name , number 
    this.setState({ name: '', number: '', })     //this.setState({ ...inititalState } можна було б так тому що він бере копію.inititalState в в ньому name: '', number: '',

  }
  onHendleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value });

  };
  render() {
    const { name, number } = this.state;
    const { onHendleSubmit, onHendleChange } = this
    console.log(this.state)
    return (

      <div className={css.wrapper}>
        <form onSubmit={onHendleSubmit} className={css.form}>
          <label className={css.name}> Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={onHendleChange}

            /> </label>
          <label className={css.name}>Number
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={onHendleChange}
            />
          </label>
          <button className={css.button} type="submit">Add contact</button>

        </form>
      </div>
    )
  }
}
ContactForm.Prototype = {
  addContact: PropTypes.func.isRequired,
}

export default ContactForm;


