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
      if(contacts&&contacts.length){ 
        this.setState({contacts})                                         //а тут зарендерили 
      } } 

    componentDidUpdate(prevProps , prevState ){   //componentDidUpdate() ДОБАВЛЯЄМО В  localStorage ЗМІНИ НАЩОГО contacts:
      const{contacts}=this.state ;
    if(prevState.contacts.length!==contacts.length){
      localStorage.setItem('my-contacts' , JSON.stringify(contacts))
    }
          }
        

  checkNameInPhonebook = userName => {                
    const { contacts } = this.state;                  ;
    return contacts.some(({ name }) => name.toLowerCase() === userName.toLowerCase());  
  };

  addContact = (userName, userTel) => {                   // ДОБАВЛЯЄМО КОНТАКТИ В НАШ STATE.CONTACT (ПЕРЕДАЄМО В CONTACTFORM)
    if (this.checkNameInPhonebook(userName)) {            //ЯКШО В ІМЯ ЯКЕ МИ ВОДИМО СПІВПАДАЄ З ТИМ ЩО ВЖЕ Є В STATE.CONTACTS ТО
    return alert(`${userName} is already in contacts!`)};  //ПЛВЕРТАЄМО ПОВІДОМЛЕННЯ
     this.setState(prevState => {          //ОТРИМУЄМО ДОСТУП ДО STATE 
      return {
        contacts: [                       //СТВОРЮЄМО МАСИВ ОБЄКТ МАСИВІВ contacts:[] 
          {                               //ТУДИ ЗАПИСУЄМО
            id: nanoid(4),                //ВИПАДКОВЕ ID ЧЕРЕЗ  nanoid(4)
            name: userName,               //name: userName, ДЕ(userName) ТЕЩО МИ БУДЕМО ВОДИТИ В ІНПУТІ З НАЗВОЮ NAME
            number: userTel,              //name: userTel, ДЕ(userTel) ТЕЩО МИ БУДЕМО ВОДИТИ В ІНПУТІ З НАЗВОЮ NUMBER
          },
          ...prevState.contacts,           //РОЗПИЛЮЄМО НАШ ОБЄКТ В.contacts
        ],
      };
    });
  };

   onHendleChange = e => {          //e.target силка на обєкт (e.target.name-це те на шо ми клікнули чи водимо, в атрибуті якого є name який  дорівнює в нашому випадку name="filter")
    this.setState({ [e.target.name]: e.target.value });//ПОЛУЧИЛИ ДОСТУ ДО STATE [e.target.name] ЦЕ БУДЕ FILTER ТОМУ ЩО В ІНПУТІ name='filter' 
   console.log(e.target.name ,e.target.value)          //(e.target.name)----filter  , (e.target.value) те шо ми водимо в інпут
  };                                //ТОБТО В state.filter ми записуємо те шо водимо в інпут з name='filter'
 

  getFilteredContact(){                                    //  ЙДЕ ДЛЯ РЕНДЕРУ ЦЕ ОДФІЛЬТРОВАНІ КОНТАКТИ  
    const{filter,contacts}=this.state;                     //ДОСТУП ДО STATE 
    const normalizedFilter=filter.toLocaleLowerCase();     // ТЕ ЩО ЩАПИСАНО У ФІЛЬТРІ ПРИВОДИМО ДО МАЛИХ ЛІТЕР
    const result=contacts.filter(({name})=>{               //БЕРЕМ НАШІ contacts ФІЛЬТРУЄМО ПО ІМЕНАХ 
      return (name.toLocaleLowerCase().includes(normalizedFilter))  //ПОВЕРТАЄМО ТІ  ОБЄКТИ ІМЕНА ЯКИХ Є В КОНТАКТАХ І ТЕШО МИ ПИШЕМО В НАШ ІМПУТ ФІЛЬТРА ЯКИЙ ПЕРЕДАЄ ДАНІ В ФІЛЬТР
    })
    return result
}

deleteContact = id => {
  this.setState(prevState => {                                             // УДАЛЯЄ ПО ID НОМЕРА
 const removeContact=prevState.contacts.filter(contact=>contact.id!==id);  //ВИЗИВАЄТЬСЯ ПРИ КЛІКУ НА BUTTON ТОЙ ЩО В СПИСКУ CONTACTLIST
    return {contacts:removeContact};                                       // ТУТ BUTTON МАЄ ID МИ ЗАХОДИМО ДО КОНТАКТІВ ФІЛЬТРУЄМО І ПОВЕРТАЄМО ВСІ ОБЄКТИ КРІМ ТОГО ЩО МИ ПОРІВНЮЄМО
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