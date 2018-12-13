// Access filtered expenses - note that the filters properties are accessible using
// destructuring...
// Timestamps are in milliseconds, using the start date of January 1, 1970 (unix epoch).
// For example, 33400 represents 33.4 seconds past January 1 at midnight.
// Like wise -1000 represents 1 second before Jan. 1, 1970.

export default (expenses, { text, sortBy, startDate, endDate }) => {
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

};
