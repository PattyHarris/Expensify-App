import {createStore} from 'redux';

// Action generators - functions that return action objects.

// NOTE: the naming convention is to use all
// uppercase (with underscores between words).

// This is the same as below, which I always forget...
// const incrementCount = () => {
//     return {
//         type: 'INCREMENT'
//     };
// };

// Payload defaults to an empty object.  We check that when setting up
// incrementBy....refactoring, the following is the same as below where
// we used destructuring to refactor the payload object and initialized the
// destructured argument as well.

// const incrementCount = (payload = {} ) => ({
//     type: 'INCREMENT',
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

const incrementCount = ( { incrementBy = 1 } = {} ) => ({
    type: 'INCREMENT',
    // Recall the the following is the same as
    // incrementBy: incrementBy
    incrementBy
});

const decrementCount = ( { decrementBy = 1 } = {} ) => ({
    type: 'DECREMENT',
    decrementBy
});

// This didn't need a default object since the count is required...
// also no default value was needed...
const setCount = ( {count } ) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// The first argument to createStore is a function.  The first argument to that
// function is the current state.  Since we don't have a constructor, we set the default
// value to a default state object, in this case an object that has a "count".
const store = createStore( (state = { count: 0 }, action) => {
    console.log(action);


    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
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

// To send an action object to the store - the following with custom
// data is the same - using destructured arguments...
// store.dispatch( {
//     type: 'INCREMENT',
//     incrementBy: 5
// });

store.dispatch( incrementCount( { incrementBy: 5} ));
store.dispatch( incrementCount() );

// If we unsubscribe, the remaining dispatches won't cause the store
// to call the subscribe method.
// unsubscribe();

// Not needed with the subscribe call.
// console.log(store.getState());

store.dispatch( resetCount() );

// Not needed with the subscribe call.
// console.log(store.getState());

store.dispatch( decrementCount( {decrementBy: 10} ));

store.dispatch( decrementCount() );

// Used as an example for required data - basically there's no checking whether the
// data exists or not...
store.dispatch( setCount( { count: 101 } ));

// Not needed with the subscribe call.
// console.log(store.getState());
