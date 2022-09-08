import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


 const valueSlice = createSlice({
   
    name: 'book',
    initialState: {
        contacts: {
            items: [],
            filter: ''
        }
    },
  reducers: {
      addContact(state, action) { //иммер преобразует мутацию
     state.contacts.items.push(action.payload); // добавление
    },
      delContact(state, action) {
     state.contacts.items.splice(action.payload, 1); //удаление
    },
     filterContact(state, action) {
         state.contacts.filter = action.payload; //фильтер
    },
  },
});

export const { addContact, delContact, filterContact } = valueSlice.actions;
export default valueSlice;

const persistConfig = { // настройки для сохранения в локал // сохраняет все включая фильтер мне так и нужно
  key: 'root',
  storage,
}

export const valueSlicePersist = persistReducer(persistConfig, valueSlice.reducer);

//selectors
 export const itemSel = ({ book }) => book.contacts.items;
 export const filterSel = ({ book }) => book.contacts.filter;