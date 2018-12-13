import React from 'react';
import ReactDOM from 'react-dom';

// Components
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';

// Action generators
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';

// Selectors
import getVisibleExpenses from './selectors/expenses.js';

// Styles
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();
console.log(store.getState());

// You only need to subscribe ONCE - see the console output - even though this is logged
// here, the subsequent dispatch calls will be properly handled....
store.subscribe( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

store.dispatch( addExpense( { description: 'Water bill', amount: 100, createdAt: -21000 }));
store.dispatch( addExpense( { description: 'Gas bill', amount: 300, createdAt: -1000 }));

store.dispatch(setTextFilter("bill"));
store.dispatch(setTextFilter("water"));

ReactDOM.render(<AppRouter />, document.getElementById('app'));
