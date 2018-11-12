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

## Setting up a 404

1. First add a simple NotFoundPage stateless functional component (as with the others so far) and add this to the list of routes with no path property.  The react-router will treat this as a match for all paths as well as paths we don't match, which is NOT what we want.  To fix this issue, we're going to use the react-router "Switch" component, replacing the current "div" tag with "Switch":
```
const NotFoundPage = () => (
    <div>
        404!
    </div>
);

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} />
            <Route path="/edit" component={EditExpensePage} />
            <Route path="/help" component={HelpPage} />
            <Route  component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);
```

2. With Switch, react-route moves the list of routes in order and stops when it finds a match.

## Linking between Routes

1. The goal here is to switch pages without going through the full page refresh (that is, server side routing).  Even if you use an href tag, you will still be using the server to change pages.

3. React-router provides Link and NavLink for client side routing.  To use Link, instead of the href below, use Link:
```
const NotFoundPage = () => (
    <div>
        404 - <a href="/">Go Home</a>
    </div>
);
```
Using Link:

```
const NotFoundPage = () => (
    <div>
        404 - <Link to="/">Go Home</Link>
    </div>
);
```
If you are linking outside the app, use href (e.g. not within your own app).

4. To render a header on every page, first create a stateless functional component Header that uses the HTML header tag:
```
const Header  () => {
    <header>
        <h1>Expersify</h1>
    </header>
}
```

Then, re-work the current routes code to put everything except the BrowserRouter in a "div" tag.  Here, add the Header component - now the header will appear on every page.

```
const routes = (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route  component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);
```

5. The challenge is to add links in the Header component for home, create, edit, and help.

6.  Using just Link, all the Header links are shown bumped into each other.  To fix that, use NavLink which is suited for cases where you have a number of links as we do with the Header.  NavLink also allows for customization (such as changing the link when you're on that link's page or changing it's color, etc).  

7. The property activeClassName allows you to specify a style for the active page.  Add "is-active" style that is defined in the "base" partial.

8. Like the Route definitions, we need to use exact=true for the NavLink as well - otherwise, the style is applied to the Dashboard link along with any of the other links.

## Organizing Routes

1. Here we'll be breaking up the app.js file into components and routers.  To start, create a new folder "routers" to hold the AppRouter.js - this is not in the components folder since it's a special type of component that isn't re-usable.

2. To start breaking things up, move all the functional components and the routes into the new file AppRouter.js (so that everything works initially).  Add the imports for react and the react-router.

3. In AppRouter.js, make the "const routes" into a stateless functional component, AppRouter, and export AppRouter as the default export.   Then, import the component inside app.js and make an instance of it such that we have what we had before.

4. The challenge is to push all the stateless functional components into their own files, setting the imports in AppRouter.js as needed.

## Query Strings and URL Parameters

1. To see what props we're getting passed, switch out EditExpensePage such that it has an explicit return instead of an implicit return - allows us to add a console.log...
```
const EditExpensePage = (props) => {
    console.log(props);
    return (
        <div>
            This is from my edit expense component.
        </div>
    );
}

```

2. Inside the props, the "history" object allows you to manipulate where the user is or is redirected.  The "match" object contains a "params" object that is used for dynamic URLs.  The "location" object contains the "query" string passed into the URL (for example, if search criteria were passed in as query parameters).

3. Inside the "location" object is a "hash" value, e.g. /edit#contact-us which could be used to scroll down to the portion of the page with the "contact us" information.

4. To make the "edit" url dynamic, such that you could pass in the database ID of the item that is being edited - see the change to the route where after the "/" a ":id" is added - that means the react-router will match anything after the "/":
```
<Route path="/edit/:id" component={EditExpensePage} />
```
If use the url, edit/99, the "props" object in the console will include a "match" object that contains:
params, id=99 (as key//value)
path = edit/:id
url = edit/99

With this change, now if you just use /edit, you will get a 404 (which makes sense) = we'll never go into the edit page without specifying which expense we're going to edit.  So, we'll also remove the NavLink from the Header component since we'll never use the edit page that way.

## Build it: Router for Portfolio Site

1. Contains 3 pages, Home, Portfolio, and Contact
URLs:
/                            -> Home page
/portfolio              -> Portfolio home page with links to items
/portfolio/123       -> Individual portfolio item page that shows the ID.
/contact                -> Contact page

2. The Home page has a title of Porfolio, the navigation links, a Welcome header (h1), and "This is my site.  Take a look around!" (p tag).

2.  The Portfolio page contains the navigation links, Contact Me (h1) and "You can reach me at test@gmail.com" (p tag).  The URL here is /contact

3. On the Porfolio page itself, again the same header.  It as an h1 tag with "My Work"  followed by "Checkout the following things I've done:" (p tag).  It also contains a list of links (e.g. Item One, Item Two).  When you click on the first one (for example), it will take you to /portfolio/1 - here, it has "A Thing I've Done" (h1) followed by "This page is for the item with an id of 1".

4. The project is started by copying the expensify-app and renaming it to portfolio-site.

5. Keep the Header and NotFoundPage.  In the Header component, remove all the links and replace them with the links for this site.  In AppRouter.js, again keeping the Header and NotFoundPage, remove all the other expensify-app components.  These will be replace with the components for this project.

6. I should have used "Link" instead of "NavLink" in PortfolioPage since we don't stay on that page...
