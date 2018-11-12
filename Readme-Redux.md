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
