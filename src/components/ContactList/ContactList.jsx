import css from "components/ContactList/ContactList.module.css";
import PropTypes from "prop-types";

const ContactList=({contacts ,deleteContact})=>{
	const contactList=contacts.map(({id,name,number})=>
	<li className={css.contactItem} key={id}>
	<span className={css.contactSpan}>{name}</span><span className={css.contactSpam}>{number}</span> 
	<button className={css.contactButton} type="button" onClick={()=>deleteContact(id)}>delete</button></li>)
  return(
	  <ol className={css.contactList}> {contactList}</ol>
  )
}
ContactList.prototype={
  deleteContact:PropTypes.func.isRequired,
	contacts:PropTypes.arrayOf(PropTypes.shape({
		id:PropTypes.string.isRequired ,
		name:PropTypes.string.isRequired,
		number:PropTypes.string.isRequired,
	})),
 }
export default ContactList