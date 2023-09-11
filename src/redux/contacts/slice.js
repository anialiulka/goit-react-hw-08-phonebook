import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        return {
          ...state,
          items: [...action.payload.reverse()],
          isLoading: false,
        };
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        return { ...state, error: action.payload, isLoading: false };
      })
      .addCase(addContact.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(addContact.fulfilled, (state, action) => {
        return {
          ...state,
          items: [action.payload, ...state.items],
          isLoading: false,
        };
      })
      .addCase(addContact.rejected, (state, action) => {
        return { ...state, error: action.payload, isLoading: false };
      })
      .addCase(deleteContact.pending, state => {
        return { ...state, isLoading: true };
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        return {
          ...state,
          items: state.items.filter(({ id }) => id !== action.payload.id),
          isLoading: false,
        };
      })
      .addCase(deleteContact.rejected, (state, action) => {
        return { ...state, error: action.payload, isLoading: false };
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
