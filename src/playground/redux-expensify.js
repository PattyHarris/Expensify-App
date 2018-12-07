import { createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//--------------------------------------------------------
// Actions:
// ADD_EXPENSE
// REMOVE_EXPENSE
// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE
//--------------------------------------------------------

// Recall that when returning an object, you must enclose the { } with ().
// Note the formatting used for complex destructured objects.
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// This action generator needs only the id - no expense object
// is needed...
const removeExpense = ( { id = ""} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// This has no defaults since it is not called if there are no updates.
// The updates parameter is an expense object...
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// Filter action generators

// Challenge is to set this up....
const setTextFilter = ( text = "" ) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// Challenge is to handle the sort by amount and date.  Andrew only
// sets the type, not the sortBy field - I think this is a better approach.
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});

// The normal functionality of arguments is that if none is supplied,
// the value is "undefined" - therefore, if no start date is given,
// it's acceptable (in this scenario) to leave the date as undefined....
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//--------------------------------------------------------
// Reducers
//--------------------------------------------------------

// Define a local variable to hold the default state values:
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            // Here we can deconstruct the expense object to
            // access just the ID....the following could be simplified to
            // a single one line, but this is clearer for the moment.
            // e.g return state.filter( ({id}) => id != action.id);
            // Recall that state is really an array of expense objects...
            const newState = state.filter( ({id}) => {
                return action.id !== id;
            });
            return  newState;
        case 'EDIT_EXPENSE':
            return state.map( (expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
             return {
                 ...state,
                 text: action.text
             };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

//--------------------------------------------------------
// Store
//--------------------------------------------------------

const store = createStore(
    combineReducers( {
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

// Access filtered expenses - note that the filters properties are accessible using
// destructuring...
// Timestamps are in milliseconds, using the start date of January 1, 1970 (unix epoch).
// For example, 33400 represents 33.4 seconds past January 1 at midnight.
// Like wise -1000 represents 1 second before Jan. 1, 1970.

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    // Filter the expenses - a return of true from filter means the expense is kept
    // in the expenses array and NOT filtered out.  Note that the check for whether the
    // timestamp is a valid number means is used for the initial boot scenario when
    // all the values would be undefined - see the Q&A for the confusion over this bit
    // of code...

    // The filtered data is then sorted....

    return expenses.filter( (expense) => {

        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

        // We don't need to verify that the input is a string...
        const textMatch =
            expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;

    }).sort( (a, b ) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createAt ? 1 : -1;
        }
        else if (sortBy === 'amount') {
            // If a < b, b will come first...
            return a.amount < b.amount ? 1 : -1;
        }
    })

}

// You only need to subscribe ONCE - see the console output - even though this is logged
// here, the subsequent dispatch calls will be properly handled....
store.subscribe( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);

    // console.log(state);
});

const expenseOne = store.dispatch( addExpense( { description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo =  store.dispatch( addExpense( { description: 'Coffee', amount: 300, createdAt: -1000 }));

// To print an object with text...
// console.log(`One:  %o`, {expenseOne});
//
// Note that we're passing in an expense object....
// store.dispatch( removeExpense( {id: expenseOne.expense.id} ));
//
// Example of using the object spread operator....
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));
//
// Challenge exercise is to complete the code to handle the following - the code
// will use the object spread operator....
// store.dispatch( setTextFilter("ffe"));
// store.dispatch( setTextFilter());
//
// Next challenge is to complete the following two sort action generators:
store.dispatch( sortByAmount() );
// store.dispatch( sortByDate() );

// And a following challenge:
// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

// Notes: the id below will be generated.  The filter object's sortBy can either be
// "amount" or "date".
const demoState = {
    expenses: [{
        id: 'abcdefg',
        description: 'January Rent',
        note: 'This is the last payment for this apartment',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}

console.log("Redux");

const user = {
    name: 'Jen',
    age: 24
}

console.log({
    ...user,
    location: 'California',
    age: 30
})
