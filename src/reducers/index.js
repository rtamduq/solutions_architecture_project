// src/reducers/index.js
import { combineReducers } from 'redux';

// Ejemplo de reducer, ajusta según tus necesidades
const exampleReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  example: exampleReducer,
  // Agrega otros reducers aquí si los tienes
});

export default rootReducer;
