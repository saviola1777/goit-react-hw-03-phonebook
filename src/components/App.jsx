import { nanoid } from "nanoid";
import React from 'react';

import Cointeiner from 'components/Cointeiner/Cointeiner';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends React.Component{
  state = {
    contacts: [],
    filter:'',
    }
    componentDidMount(){                                                  //рендерить розмітку з початкового стану тільки один раз тобто при загрузці
      const contacts=  JSON.parse(localStorage.getItem('my-contacts')); //тут ми забрали наші номера шо ми добавляли раніше в localStorage 
      if(contacts){                  //ТУТПЕРЕВІРЯЄМО localStorage(якшо в localStorage ще нічого немає тому умова приводиться до false бо там буде 0 тому  нам нічого не треба рендерити)
        this.setState({contacts})           //ЯКШО УМОВА ПРИВОДИТЬСЯ ДО TRU ТОБТО В LOCALSTARAGE ЩОСЬ Є ТО МИ РЕНДЕРИМО 
      } } 

    componentDidUpdate(prevProps , prevState ){   //componentDidUpdate() ДОБАВЛЯЄМО В  localStorage ЗМІНИ НАЩОГО contacts-- ЦЕЙ МЕТОД ВИЗИВАЄТЬСЯ ПРИ ЗМІНІ STATE БАГАТО РАЗ 
      const{contacts}=this.state ;
    if(prevState.contacts!==contacts){
      localStorage.setItem('my-contacts' , JSON.stringify(contacts))
      console.log(`Попередній стан prevState.contacts.length :`,prevState.contacts.length)
      console.log(`Теперішній стан contacts.length :`,contacts.length)
    }}
        

  checkNameInPhonebook = userName => {                
    const { contacts } = this.state;                  ;
    return contacts.some(({ name }) => name.toLowerCase() === userName.toLowerCase());  
  };

  addContact = (userName, userTel) => {                   
    if (this.checkNameInPhonebook(userName)) {            
    return alert(`${userName} is already in contacts!`)};  
     this.setState(prevState => {          
      return {
        contacts: [                       
          {                              
            id: nanoid(4),                
            name: userName,               
            number: userTel,              
          },
          ...prevState.contacts,           
        ],
      };
    });
  };

   onHendleChange = e => {          
    this.setState({ [e.target.name]: e.target.value });
   console.log(e.target.name ,e.target.value)         
  };                                
 

  getFilteredContact(){                                    
    const{filter,contacts}=this.state;                     
    const normalizedFilter=filter.toLocaleLowerCase();     
    const result=contacts.filter(({name})=>{           
      return (name.toLocaleLowerCase().includes(normalizedFilter)) 
    })
    return result
}

deleteContact = id => {
  this.setState(prevState => {                                             
 const removeContact=prevState.contacts.filter(contact=>contact.id!==id);  
    return {contacts:removeContact};                    
  });
};

render(){
 const {deleteContact, onHendleChange, addContact}=this
  const contacts=this.getFilteredContact();
  //  console.log('Render')
  return (
    
    <Cointeiner>
      <h2>Phonebook</h2>
    <ContactForm  addContact={addContact}/>
    <h2>Contacts</h2> 
    <Filter  onHendleChange={onHendleChange} />
    <ContactList contacts={contacts} deleteContact={deleteContact}/>
    </Cointeiner>
   
    )}
  }
  export default App
  
 //ЖИТЄВИЙ ЦИКЛ ВИКЛИКАЄТЬСЯ КОНСТРУКТОР , ПОТІМ РЕНДЕР ПОТІМ РЕАКТ ОБНОВЛЯЄ DOM І ПОТІМ ВИКЛИКАЄТЬСЯ ПЕРШИЙ МЕТОД componentDidMount ВІН ВИКЛИКАЄТЬСЯ ПІСЛЯ ТОГО ЯК ВСЕ ВІДМАЛЮЄТЬСЯ
 //І ЛИШЕ ОДИН РАЗ А ВЖЕ ПІСЛЯ ЗМІНИ SETSTATE ТОБТО КОЛИ МИ ДОБАВИЛИ ЯКИЙСЬ КОНТАКТ ЧИ ВИДАЛИТИ ВОНО ВИКОНУЄ ЗНОВУ РЕНДЕРИТЬ ОНОВЛЮЄ DOM І ТОДІ СПРАЦЮВУЄ componentDidUpdate
 //componentDidMount ====ВІДМАЛЮУЮТЬСЯ КОМПОНЕНТИ В ПЕРШИЙ РАЗ ТОБТО ЯКЩО СПОЧАТКУ STATE.CONTACTS[] ТО ВІДМАЛЮЄТЬСЯ ПУСТИЙ МАСИВ
 //  componentDidUpdate
// Объекты веб-хранилища localStorage дозволяє зберігати  пари ключ/значеня в браузере.