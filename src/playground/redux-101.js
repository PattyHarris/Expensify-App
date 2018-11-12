import {createStore} from 'redux';

// The first argument to createStore is a function.  The first argument to that
// function is the current state.  Since we don't have a constructor, we set the default
// value to a default state object, in this case an object that has a "count".
const store = createStore( (state = { count: 0 }, action) => {
    console.log(action);


    switch (action.type) {
        case 'INCREMENT':

            // Since we don't always get the incrementBy value, we need to check it's validity.
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;

            return {
                count: state.count + incrementBy
            };
        case 'DECREMENT':

            // Since we don't always get the decrementBy value, we need to check it's validity.
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;

            return {
                count: state.count - decrementBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            };
        default:
            return state;
    };

});


// Not needed with the subscribe call.
// console.log(store.getState());

// With this method call, we don't need the prior log statements since
// this will be called for every dispatch below.  To unsubscribe from the store,
// call the method returned....
const unsubscribe = store.subscribe( () => {
    console.log(store.getState());
});

// To send an action object to the store:  NOTE: the naming convention is to use all
// uppercase (with underscores between words).
store.dispatch( {
    type: 'INCREMENT',
    incrementBy: 5
});

store.dispatch( {
    type: 'INCREMENT'
});

// If we unsubscribe, the remaining dispatches won't cause the store
// to call the subscribe method.
// unsubscribe();

// Not needed with the subscribe call.
// console.log(store.getState());

store.dispatch( {
    type: 'RESET'
});

// Not needed with the subscribe call.
// console.log(store.getState());

store.dispatch( {
    type: 'DECREMENT',
    decrementBy: 10
});

store.dispatch( {
    type: 'DECREMENT'
});

// Used as an example for required data - basically there's no checking whether the
// data exists or not...
store.dispatch( {
    type: 'SET',
    count: 101
});

// Not needed with the subscribe call.
// console.log(store.getState());
