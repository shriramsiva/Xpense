import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { Message, useToaster } from 'rsuite';


// Initial state
const initialState = {
  transactions: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [type] = React.useState('success');
  const [placement] = React.useState('bottomStart');
  const toaster = useToaster();

  const message = (
    <Message showIcon type={type}>
      {type}: transaction deleted successfully
    </Message>
  );
  // Actions
  function deleteTransaction(id) {
     toaster.push(message, { placement })
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}