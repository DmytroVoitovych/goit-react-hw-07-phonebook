import {createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, delContact } from './slice';
const axios = require('axios').default;

const BASE_URL = 'https://631aefbddc236c0b1ee7c2e4.mockapi.io/contacts/contacts/';

export const axiosContacts = createAsyncThunk('book/axiosContacts', async (_,{rejectWithValue}) => { // получаем с базы
  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
    return response.data;
  } catch(error) {
    return rejectWithValue(error.message);   
  }
      
});

export const axiosContactsDell = createAsyncThunk('book/axiosContactsDell', async ({ id, back },{rejectWithValue,dispatch}) => {
    try {
          console.log(id);
        const data = await axios.delete(`${BASE_URL}${back}`); //удаление с базы
        console.log(data);
        return dispatch(delContact(id)); //удаление с массива
  } catch(error) {
    return rejectWithValue(error.message);   
  }
      
});



export const axiosContactsPost = createAsyncThunk('book/axiosContactsPost', async (obj,{rejectWithValue,dispatch}) => {
    try {// добавляем в базу
    //   console.log(obj);
    const data = await axios.post(BASE_URL,obj);
    console.log(data);
        return dispatch(addContact(data)); 
  } catch(error) {
    return rejectWithValue(error.message);   
  }
      
});