// Filter action generators

export const setTextFilter = ( text = "" ) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// Challenge is to handle the sort by amount and date.  Andrew only
// sets the type, not the sortBy field - I think this is a better approach.
export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
});

export const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});

// The normal functionality of arguments is that if none is supplied,
// the value is "undefined" - therefore, if no start date is given,
// it's acceptable (in this scenario) to leave the date as undefined....
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});
