import {useState, useMemo} from "react";
import { nanoid } from 'nanoid';
import { Phonebook } from "components/Phonebook/Phonebook";
import { Contacts } from "components/Contacts/Contacts";
import { Filter } from "components/Filter/Filter";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { addContact, delContact, filterContact, itemSel, filterSel  } from "Redux/slice";
import { useDispatch, useSelector } from 'react-redux';


export const App = () => {
 
  const [name, setName] = useState(''); 
  const [number, setNumber] = useState('');
  const dispath = useDispatch();
  //селекторы
  const item = useSelector(itemSel);
  const filter = useSelector(filterSel);
  
  
  const deleteContact = (id) => { // удаление контакта
    
    dispath(delContact(id,)); // возвращаем обновленный стейт с удаленным обьектом
    Notify.success('The contact has been successfully deleted.');
    
  };
   
  const getValueInput = (e) => { // получение значений инпутов формы
    // https://ru.reactjs.org/docs/forms.html  по примеру с документации
    const target = e.target.type;
    const val = e.target.value;
    switch (target) {
      case 'text':
        setName(val);
        break;
      case 'tel':
        setNumber(val);
        break;
      default:
        return;
    }
  };
  
  const chekingContacts = () => {// проверка уникальности имени
    const chek = item.find((contact) => contact.name === name); //ищем одинаковое 
    if (chek) { // если есть уже
      Report.failure('Error', 'This name is already in your contact list, enter another name, and try again.', 'OK');
    }
                       
    else { // если нет
      Notify.success('Contact has been successfully added.');
      return dispath(addContact({ id: nanoid(), name: name, number: number })); // обновляем глобальное состояние
         }
  };
  
  const setContactsName = (e) => { e.preventDefault(); setName(''); setNumber(''); chekingContacts(); }; // проверка уникальности имени в контактах 
 
  const changeFilter = (e) => { dispath(filterContact(e.currentTarget.value)) }; // значение фильтра
   
  const contactFiltering = useMemo(() => {
    // фильтрация контактов // мемо чисто что бы не было перерендера когда изменяется велью
    const normalizeFilter = filter.toLowerCase();
    return item.filter(contact => contact.name.toLowerCase().includes(normalizeFilter)
      || contact.number.toLowerCase().includes(normalizeFilter));
  }, [item, filter]); //добавил еще фильтер и по номеру 

  return (
    
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        padding: '0 15px'
      }}
    >
      < section >
            {<Phonebook input={getValueInput} val={{ name: name, tel: number, }} btn={setContactsName}  />}
           <div> <h3>Contacts</h3>
            {<Filter changes={changeFilter}  filter={filter}/> }
          {<Contacts contacts={contactFiltering} away={deleteContact} />}
                </div>
        </section >
    </div>
  );
};
