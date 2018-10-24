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
