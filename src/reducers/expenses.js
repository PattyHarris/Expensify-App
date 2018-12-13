//  Expenses Reducers

// Define a local variable to hold the default state values:
const expensesReducerDefaultState = [];
export default (state = expensesReducerDefaultState, action) => {
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
