  import PropTypes from "prop-types";
import css from "components/ContactForm/ContactForm.module.css"

const ContactForm = ({ addContact }) => {
  const onFormSabmit = e => {
    e.preventDefault();
    const userName = e.currentTarget.name.value;
    const userTel = e.currentTarget.number.value;
    addContact(userName, userTel);
    e.currentTarget.reset();
    
  }; 

return( 
  
    <div className={css.wrapper}>
    <form onSubmit={e => onFormSabmit(e)} className={css.form}>
    <label className={css.name}> Name
        <input
  className={css.input}      
  type="text"
  name="name"
  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
  
/> </label>
     <label className={css.name}>Number
     <input
          className={css.input}
					type="tel"
					name="number"
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
					/>
     </label>
     <button className={css.button} type="submit">Add contact</button>

      </form>
      </div>
       ) 
 }
 ContactForm.prototype={
  addContact:PropTypes.func.isRequired,
 }

export default ContactForm;


