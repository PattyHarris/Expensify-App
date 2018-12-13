# React with Redux

This section will take the code from the Redux section and break it apart in the components area using connected components.  These are components that can read and update the contents of the store.

## Organizing Redux

1. First, create a new folder, "actions" that will contain 2 files, one for filters and one for expenses.

2. Additional folders are "store", "reducers", and "selectors", the latter which query things from the Redux store (e.g. getVisibleExpenses).

3. In the actions folder, create a file for the expenses action generator, expenses.js.  Copy the addExpense, removeExpense, and editExpense methods from the redux-expensify.js file.  Import the uuid method dependency.  These action generators will be named exports, which is easily accomplished by adding "export" in front of each "const", e.g. export const addExpense(...).

4. Repeat the above step for the filter action generators.

5. Next step is pull out the reducers - here we have a expense and filters reducers, each with their own file.  In the reducer files, we're only exporting one thing, so we can use the following format for the export:
```
export default (....)
```

6. Add an expenses.js file to the selectors folder and copy the getVisibleExpenses method to that new file.  Make getVisibleExpenses method a default export as was done with the reducers...

7. Create a configureStore.js file in the store folder which will tie all of the prior steps together.  At this point, all we're putting in this file is the createStore method with respective imports.  Recall that if the export is a default export, you can import it with any name you want (since it has only one export).

8. The createStore method is put inside a "default export" outter method so that the store itself can be returned...

9. Reset webpack.config.js to run app.js and restart the dev-server.

10. In app.js, import the default export from configureStore and create a store - e.g.
```
import configureStore from '../store/configureStore';
...
const store = configureStore();
console.log(store.getState());

```

11. The challenge is to perform the following:
a. addExpense -> Water bill
b. addExpense -> Gas bill
c. setTextFilter -> bill (2 items) -> water (1 item);
d. getVisibleExpenses -> print visible ones to the screen

This will involve importing the new action generators and selectors...
I add a subscribe call, which we really didn't need to do - Andrew just wanted one call to getVisibleExpenses and then log that output.

## Higher Order Components

1. Here we're first going to install react-redux...this allows us to connect the redux store to the react components.  This package makes extensive use of higher order components, HOC's.

2. To play around with HOC's, create a playground file, hoc.js, setting webpack to run that file.

3. A Higher Order Component is a component that renders one or more components.  That component that renders that other component is called the HOC component.

4. HOC's have the following benefits:
a. Code reuse
b. Render hijacking
c. Prop manipulation
d. Abstract state

5. In the example created, we first created a regular function, "withAdminWarning" that takes as an input the Info component.  When this function is called, it returns an HOC.

```
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// It's common to use the term "wrapped" when referring to wrapped components.
// Since it's a component, the first letter is capitalized.
 const withAdminWarning = ( WrappedComponent ) => {
     // The returns an HOC....
}

const AdminInfo = withAdminWarning(Info);
```

6. Instead of rendering Info, we now render AdminInfo.  To get the props passed to the child, we use a JSX expression that uses the spread operator to spread all the key value pairs passed into withAdminWarning as props into the WrappedComponent (e.g. Info).

7. To show how the HOC can also use the passed in props, we added an isAdmin property, that when set to false, the message is not displayed.

8. In Redux, the pattern above is the same.  We pass one of our components into a Redux component, which returns a new component that will have access to the store.

9. Challenge is to create a HOC that completes the following statements:
```
const AuthInfo = requireAuthentication(Info);

ReactDom.render( <AuthInfo isAuthenticated={true} info="Here are the details" />, document.getElementById('app'));
```

A value of "true" means the Info component should show (and is otherwise hidden).  If "false" is passed in, show a message, "Please login to view the info.".

NOTE: recall that you can't use if-then-else in JSX - so you need to use && or ternary operators....

## Connecting Store and the Component with React-Redux
