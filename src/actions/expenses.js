// Action geneator for expenses
import uuid from 'uuid';

// Recall that when returning an object, you must enclose the { } with ().
// Note the formatting used for complex destructured objects.
export const addExpense = (
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
export const removeExpense = ( { id = ""} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// This has no defaults since it is not called if there are no updates.
// The updates parameter is an expense object...
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});
