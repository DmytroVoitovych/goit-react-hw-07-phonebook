import { createSlice } from '@reduxjs/toolkit';
import { axiosContacts } from './axios';
import { axiosContactsDell } from './axios';

 const valueSlice = createSlice({
   
    name: 'book',
    initialState: {
        contacts: {
            items: [],
            filter: '', 
            isLoading: false,
            error: null,
        }
    },
  reducers: {
      addContact(state, action) { //иммер преобразует мутацию
     state.contacts.items.push(action.payload.data); // добавление
    },
      delContact(state, action) {
     state.contacts.items.splice(action.payload, 1); //удаление
    },
     filterContact(state, action) {
         state.contacts.filter = action.payload; //фильтер
    },
   },
   extraReducers: {
     [axiosContacts.pending]: ({ contacts }, action) => { contacts.error = null; contacts.isLoading = false;},
     [axiosContacts.fulfilled]: ({ contacts }, { payload }) => {console.log(payload); contacts.isLoading = true; contacts.items = payload;},
     [axiosContacts.rejected]: ({ contacts }, { payload }) => { contacts.isLoading = false; contacts.error = payload; console.log(contacts.error); },
     [axiosContactsDell.rejected]: ({ contacts }, { payload }) => { contacts.isLoading = false; contacts.error = payload; },
  }
});

export const { addContact, delContact, filterContact,  } = valueSlice.actions;
export default valueSlice;



//selectors
export const itemSel = ({ book }) => book.contacts.items;
export const filterSel = ({ book }) => book.contacts.filter;
export const bookError = ({ book }) => book.contacts.error;
export const statusAxios = ({ book }) => book.contacts.isLoading;