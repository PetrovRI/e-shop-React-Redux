import { combineReducers } from 'redux';
import { BasketReducer } from './Basket/BasketReducer';

export const rootReducer = combineReducers({
  basket: BasketReducer,
});
