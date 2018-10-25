# React Router

## Server vs Client Side Routing

1. Server side routing: an HTTP request is made to the server that returns the HTML that is rendered in the browser.

2. In client side routing, when the URL changes, we find the matching component and render with a JS function call.

## Setting up Expensify

1. To start this project, we're taking the IndecisionApp folders and files as a framework.  In the terminal tabs, navigate to this new folder as well.

2. Remove all the components by replacing IndecisionApp in app.js with a simple "p" tag - remove the contents of the components folder as well....
```
ReactDOM.render(<p>This is my boilerplate</p>, document.getElementById('app'));
```

3.  Clear also the contents of the playground folder.

4. In the styles files, keep the settings and base files, but clear the colors from the settings partial file - the background color used in the the base partial can be removed (it will default to white).  In styles.scss, remove all the imports except those for the settings and base partials.

5. Lastly, remove the files from the styles/components folder.

6. In index.html, replace the title with "Boilerplate".  Also in package.json - replace the title with "boilerplate"

## React Router 101

1. To get more information on React Router, Google "react-router" and click on the github repository (https://github.com/ReactTraining/react-router).  From there, click on link at the top: https://reacttraining.com/react-router/

2. To install just the web version (to install the native, use react-router-native and install all of it, use react-native):
```
yarn add react-router-dom@4.2.2
```

3. To use react-router, we'll import the named exports, initially just BrowserRouter and Route (see app.js).  BrowserRouter is used for creating the Route, and likewise a Route is created for each page.

4. Setting up the BrowserRouter (with no routes) - this will display a blank page since we're not rendering anything yet:
```
const routes = (
    <BrowserRouter>
    </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('app'));
```

5. To add a route, we provide a path and a component (that takes an JSX expression) - here we are using the root of the application and a dummy (stateless functional) component:
```
const ExpenseDashboardPage = () => (
    <div>
        This is from my dashboard page.
    </div>
);
const routes = (
    <BrowserRouter>
        <Route path = "/" component={} />
    </BrowserRouter>    
)
```

6. BrowserRouter expects a "child length of 1" - that makes no sense but if you add more than 1 child route, you need to put them in a "div" tag.

7. In the following example, if we tried to access the "create" page (e.g. localhost:8080/create), we'll get an GET 404 error since the browser is using initially server side routing (for the first page load).  
```
const ExpenseDashboardPage = () => (
    <div>
        This is from my dashboard component.
    </div>
);

const AddExpensePage = () => (
    <div>
        This is from my add expense component.
    </div>
);

const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} />
            <Route path="/create" component={AddExpensePage} />
        </div>
    </BrowserRouter>
);
```

8. To allow for both "/" and "/create" in the browser, we need to tweak the devServer properties in webpack.config.js to send back index.html for all routes:
```
devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
}

```

historyApiFallback tells the devServer that we are handling all routing in the client side code and it should return index.html for all 404's.  Andrew will go over later how to handle this in production.

As it stands now, this will return both "/" and "/create" when you use localhost:8080/create since it matches both URLs.  To fix this problem, add the "exact={true}" attribute to the root route.

8. Challenge is to add a "/edit"  and "/help" route using the same mechanisms as above....
