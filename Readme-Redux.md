# Redux

## Why do we need Redux

1. In the simple case of IndecisionApp, the IndecisionApp component controls state.  If an option is added, the AddOption component uses a callback method to update the state.  The updated state is then passed down from the IndecisionApp to the Options component (and likewise the Option components).

2. In the more complex case, in the ExpensifyApp, the AddExpensePage and ExpensifyDashboardPage components are accessed through the router - there is no connection between them.   The AddExpensePage will have an AddExpense form and the ExpensifyDashboardPage will have a list of expenses (e.g. Expenses and Expense).  When we add an expense (Add Expense form)  we need a way to update the data in the dashboard page.

3. IndecisionApp: The components we're creating aren't re-usable.  Here Andrew means that the components in IndecisionApp are so closely bound, they can't be re-used (meaning you can't use Action inside Header without passing all the props from the IndecisionApp component to Header and then to Action).

4. ExpensifyApp: here, if we want to use the AddExpense component inside the AddExpensePage and the ExpensifyDashboardPage, we need to make sure that the AddExpense component isn't dependent upon any props that have to be passed to it from either container component.  Redux allows this to happen.

## Setting up Redux

1. To start off, we're going to use a playground file to play around with the Redux features.  Create a new file in playground, redux-101.js.

2. Temporarily, redirect webpack.config.js to this new file - change the "entry" to point to the redux-101.js file.

3. For more information on Redux, see https://redux.js.org/

4. Install:
```
> yarn add redux@3.7.2
```

4. Import into redux-101.js the named export "createStore".

5. The createStore method takes a single argument, a function.  That function takes as an argument, "state", which is the current state.  There is no constructor here, so we set the state to a default state object - in this simple example, the object contains "count".  This simple store just returns the given state;
```
const store = createStore( (state = { count: 0 }) => {
    return state;
});

```

## Dispatching Actions

1.  Actions are objects that get sent to the store and tell the store what type of change to make against the data.

2. Every action requires a "type" - the naming convention here is to use all uppercase.  If you need to words, separate them with underscores (e.g. MY_ACTION).  To send the action object to the store, use the "dispatch" method that takes an action object.
```
store.dispatch( {
    type: 'INCREMENT'
    });
```

3. The action gets passed in as a parameter to the createStore function parameter:
```
const store = createStore( (state = { count: 0 }, action) => {
    console.log(action);
    return state;
});
```

You'll notice in the console.log that the first call is the init call, and the second call is from the dispatch with the action type = INCREMENT.

4. Just like component state, you never change the redux state or action directly:
```
const store = createStore( (state = { count: 0 }, action) => {
    if (action.type === "INCREMENT") {
        return {
            count: state.count + 1
        };
    }
    else {
        return state;
    }
    return state;
});

```

5. Challenge is to complete the "reset" function.  

## Subscribing and Dynamic Actions

1. This section discusses how to watch for changes to the store and how to pass additional data along in the action.

2. To watch for changes, use the "subscribe" method on the store.  This method takes a single function that is called every time the store changes:
```
const unsubscribe = stores.subscribe( () => {

});
```

3. To unsubscribe, you call the function that's returned from the subscribe call:
```
const unsubscribe = stores.subscribe( () => {

});

// Do some stuff
unsubscribe();
```

4. To pass data along in the dispatch, you can add another property in the dispatch object.  Note that you don't have to add the property in all dispatches:
```
store.dispatch( {
    type: 'INCREMENT',
    incrementBy: 5
});

store.dispatch( {
    type: 'INCREMENT'
});
```

5. The challenge is to repeat the incrementBy steps for 'DECREMENT'.

6. To require that an action contain some particular data, Andrew just doesn't check whether or not the data exists.  Seems error prone...

## ES6 Object Destructuring

1. For this section, create a file in the playground folder called "destructuring.js" and set webpack.config.js to run that file.  Add a console.log() to make sure it's running...

2. The goal here is to use object destructuring that allows access to the object attributes without separate variable definitions or using person.age, e.g. NOT this:
```
const person = {
    name: 'Patty',
    age: 63,
    location: {
        city: 'Palo Alto',
        temp: 70
    }
};

const name = person.name;
const age = person.age;

// Notice these are back-ticks...
console.log(`${name} is ${age}.`)
```

This is the same as the const declarations above - const can be let or var as well...
```
const {name, age } = person;
```

3. This can also be done easily with nested objects as in the case of location:
```
const { city, temp } = person.location;
```

4. If you want to use a different name for the local variable:
```
const { city, temp: localTemperature } = person.location;
if (city && localTemperature) {
    console.log(`It's ${localTemperature} in ${city}.`);
}
```

5. You can setup default values:
```
const { name: 'Anonymous', age } = person;
```

6. Challenge is to take the book object below, and using object destructuring, add the console.log that follows:
```
const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

// Prints the publisher name, defaulting to "Self-Publshed" if no publisher is provided
// in the object.
const { name: publisherName = 'Self-Published'} = book.publisher;
console.log(publisherName);
```

## ES6 Array Destructuring

1. Similar to object destructuring.  For object destructuring we use {}, but for array destructuring we use [].    Local variables are matched by position.  For example:
```
const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [ street, localCity, state, zip] = address;
console.log(`You are in ${localCity}, ${state}.`);
```

If you want to skip any position - this skips street and zip:
```
const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [, localCity, state] = address;
console.log(`You are in ${localCity}, ${state}.`);
```

2. Array defaults are set like in object destructuring - here, if there were no 3rd element, this would use 'New York':
```
const address = [];
const [ , , state = 'New York'] = address;
console.log(`You are in ${state}.`);
```

3. Challenge is to use the following array to print out the shown log message using array destructuring:
```
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
console.log('A medium Coffee (hot) costs $2.50.');
```
Which results in this - really didn't need to create local variables for the small and large prices:
```
const [coffeeType, smallPrice, mediumPrice, laregPrice] = item;
console.log(`A medium ${coffeeType} costs ${mediumPrice}.`);

```

## Refactoring and Reorganizing

1. Here we're going to be using destructuring to refactor our redux code.  Switch the webpack.config.js back to using redux-101.js.

2. Start by creating action generators - these are functions that return action objects.  The first action generator will take care of all the 'INCREMENT' objects, e.g.
```
store.dispatch( {
    type: 'INCREMENT'
});

```

An action generator for the above:
```
const incrementCount = () => {
    return {
        type: 'INCREMENT'
    };
};
store.dispatch( incrementCount() );
```

Using these simple functions prevents errors from mistyping and enables auto-completion to work for you as well...

3. To handle special input to an action generator, we add an input parameter that is an object that defaults to an empty object.  The action generator is called by passing in an object - with this, we can call incrementCount with or with out the payload object value:
```
const incrementCount = ( payload = {} ) => ({
    type: 'INCREMENT',
    incrementBy:  typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});

store.dispatch( incrementCount( {incrementBy : 5}));
```

Note that you need to have payload set to a default value (e.g. {}) otherwise, if we call the action generator without a payload, payload will be undefined and therefore incrementBy will be undefined.  Think of payload as an action object.


4. You can also destructure arguments that get passed into functions - for example, the following are equivalent:
```
const add = (data) => {
    return data.a + data.b;
};
console.log( add ( {a: 1, b: 12}));
```

We can remove the data object and add {} to replace the first argument into the add function:
```
const add = ({a, b}) => {
    return a + b;
};
console.log( add ( {a: 1, b: 12}));
```

To pass in a 3rd argument:
```
const add = ({a, b}, c) => {
    return a + b + c;
};
console.log( add ( {a: 1, b: 12}, 100));
```

5. We can also add defaults to destructured function arguments - using incrementCount - recall when the argument property has the same name as the local variable, we don't need to use incrementBy: incrementBy.
```
const incrementCount = ( { incrementBy = 1 } = {} ) => ({
    type: 'INCREMENT',
    // Recall the the following is the same as
    // incrementBy: incrementBy
    incrementBy
});
```

6. We repeat the steps above for decrementCount.  The challenge is to add the setCount and resetCount functions.

7. This portion of the tutorial includes all of the redux functions in a single file - later we'll break them out into individual files.

## Reducers

1. The job of the reducer is to change the application state in response to an action.  In redux-101 we actually created a reducer indirectly - it's the anonymous function passed into the createStore function - e.g.  (state = { count: 0 }, action) => {....}  So, the current call to createStore becomes:
```
const countReducer =  (state = { count: 0 }, action) => {}

const store = createStore(countReducer());

```

2. Reducers have the following properties:
a. They are pure functions, meaning their return is dependent upon data input to them or the data they currently have.  Their output depends only on their input.  They also don't change anything outside their function:
```
let result;
const add = (a, b) => {
    result = a + b;
}
```
b. Never directly change state or action.

3. For the next part of this tutorial, create a new file in the playground, redux-expensify.js (change webpack.config.js accordingly).

4. Import both createStore and combineReducers (which allows us to combine multiple reducers).

5. For this example, we create a demoState object that contains an array of expense objects - amount is in cents, createAt is a timestamp value.  Andrew uses cents to get around decimals.  We're also allowing for filters which allow filtering the data.  The filter object below has initial values that allow for filtering the text and sorting (either by amount or by date).
```
const demoState = {
    expenses: [{
        id: 'abcdefg',
        description: 'January Rent',
        note: 'This is the last payment for this apartment',
        amount: 54500,
        createdAt: 0
    }],
    filter: {
        text: 'rent',
        sortBy: 'amount', // Sort by amount or data
        startDate: undefined,
        endDate: undefined
    }
}
```

## Working with Multiple Reducers

1. The actions for this data is more complex, and thus need for multiple reducers.   There will be a single reducer for each root property, e.g. expenses and filter.

2. Start with the expensesReducer.  When setting up the reducers, use a variable to define the default values instead of doing that inline, e.g.
```
const expensesReducerDefaultState = [];
const expensesReducer =  (state = expensesReducerDefaultState, action) => {

}
```
This will be more apparent when setting defaults for something like the filterReducer.

3. combineReducers takes an object as it's first parameter and in that object, the key is the root state name and the value is the reducer that's supposed to manage it.
So for example, instead of calling createStore like this:

```
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
};

// Store
const store = createStore(expensesReducer);

```

We call createStore like this (where expenses is an array in the demoState object above):
```
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
};

// Store
const store = createStore(
    combineReducers( {
        expenses: expensesReducer
    })
);

```
This allows for more complex stores - the redux store is now an object and the expenses array is a property of that object.

4. The challenge is to add the filterReducer as we did above, with specified defaults (e.g. text='', sortBy='date', startDate and endDate = undefined).

## ES6 Spread Operator in reducers

1. First, create an action generator for the ADD_EXPENSE action.  This takes a 'type' and expense object in which the ID is generated.  We'll be using the NPM library, UUID: https://www.npmjs.com/package/uuid  Eventually, we'll let the database generate the IDs...install the package as before...
```
> yarn add uuid@3.1.0
```

2. The UUID package has default export which is used as the import:
```
import uuid from 'uuid';
```

3. To add data to an array without changing the array itself, you can use 'concat' which will return a new array or the ES6 spread operator.  This comes to play when adding an item to the expenses array - when the reducer receives the ADD_EXPENSE action, we need to add an item to the state, which is actually an array:
```
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return state.concat(action.expense);
        default:
            return state;
    }
};

```

The spread operator can be used instead - when you see "...state" where  "state" is an array, read this as "spreading out all the elements of state".  Here, we're adding the expense object onto the state array.
```
case 'ADD_EXPENSE':
    return [
        ...state,
        action.expense
    ]

```

4. The challenge is to remove an expense.  Note that the call to "dispatch" returns the action object, which includes the action ID.  We'll need this to remove the action.  We're also need to use the "filter" method for removing the item from the array - we used "filter" in the last project - see the IndecisionApp project.  This was a bit confusing since I chose to pass in an expense object - filter takes a callback function that returns true or false.  If it returns true, the item is kept in the new array, otherwise, the item is eliminated from the new array.  My original implementation of the function generator with an object:
```
const removeExpense = ( { id = ""} = {}) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id: id
    }
})

```
What we really just needed:
```
const removeExpense = ( { id = ""} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

```

## Spreading Objects

1. The spread operator on objects works like that for arrays, but because it's a bit new, we need a plug for babel.  If you do something like the following, you'll get an error with the existing babel:
```
const user = {
    name: 'Jen',
    age: 24
}

console.log({
    ...user
});
```

To fix this, we need a special plug - Google, "babel object spread" - use the link for the Babel object rest spread: https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread:
```
> yarn add babel-plugin-transform-object-rest-spread@6.23.0
```
Add the plugin to .babelrc - recall that we don't need to add the "plugin" prefix to the name:
```
{
    "presets": ["env",  "react"],
    "plugins": [
        "transform-class-properties",
        "transform-object-rest-spread"
    ]
}
```
With there changes, the console.log above compiles correctly.

2. With the object spread operator, you can add new properties to the new object as well as override existing properties:
```
const user = {
    name: 'Jen',
    age: 24
};

console.log({
    ...user,
    location: 'California',
    age: 30
});

```

3. We'll be using the object spread operator to allow the user to edit their expenses.  We use the "map" operator to iterate over all the expenses.  If we find the matching ID, we spread all the properties of the expense object (meaning we want them all) and override any matching properties from the "update" object that is passed in.

The dispatch call uses the expenseTwo object (since in the current logic, we had removed expenseOne) and update the amount:
```
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500}));
```

The editExpense function - recall that this returns an object...
```
const editExpense = (id, updates) => ({
    type: EDIT_EXPENSE,
    id,
    updates
});
```

And then the handler for the EDIT_EXPENSE action:
```
    case EDIT_EXPENSE:
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
```

4. The challenge is to add an action generator for the filter reducer to set the text of the filter.  The code should use the object spread method as above.  The action generator has the following format - the first call sets the text, whereas the second call should clear the text.
```
store.dispatch( setTexFilter("rent"));
store.dispatch( setTexFilter());
```

Note that the text is NOT passed in as an object, as with the expense objects.

## Wrapping up our Reducers

1. We start this section with a challenge to complete the filter sort action generators for sorting by date and sorting by amount.  This doesn't entail sorting the actual expenses....just setting the filter..

2. The next step is also a challenge and is to complete the start and end date action generators.  Assume that the date values are number values (e.g. timestamps) and should handle the following calls:
```
// The second call resets the start date to undefined.
store.dispatch(setStartDate(125))
store.dispatch(setStartDate());
store.dispatch(setEndDate(1250));
```

## Filtering Redux Data

1. This section will filter and sort the expenses data - it doesn't sound like we'll be storing the data filtered, just outputting it....

2. Add a function getVisibleExpenses(expenses, filters) and call it in the subscribe method call:
```
const getVisisibleExpenses = (expenses, filters) => {
    // For now, just return expenses
    return expenses;
}

store.subscribe( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})
```

3. Destructure the filter input property in the getVisibleExpenses call:
```
const getVisibleExpenses = ( expenses, {text, sortBy, startDate, endDate} ) +> {
    ....
}
```

4. First we'll filter the data - later we'll handle the sortBy....using the filter method that takes a function - the filter callback function returns true or false, where a true match means the item is left in the expenses array, which means it's NOT filtered out.  
```
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter( (expense) => {

    })
}
```

Initially, set the text filter to true since that will be a followup challenge.  Added a createdAt timestamp of 1000 and -1000 to the expenses we added.   Everything should be commented out except for the addExpense and setStartDate call (125) for this test.


5. The challenge is to complete the code for the text filter.  This will use the "includes" method.  The comparison is case insensitive, so convert the text used for the the filter and expense description to lower case.

## Sorting Redux Data

1. Using the sort method - for simple arrays, to compare function is needed.  When comparing objects, we'll need to add the compare function.

2. Andrew attached the sort method to the return statement at the end of the getVisibleExpenses method - the filtered data is then sorted:
```
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter( (expense) => {
        ....
        return startDateMatch && endDateMatch && textMatch;
    }).sort( (a, b) => {

    })
}
```

3. Challenge is to complete the code for the sort by amount.  Uncomment out the sortByAmount console.log call....

This is the end of this section - after this, we'll be breaking up this code and placing it in some of the components....
