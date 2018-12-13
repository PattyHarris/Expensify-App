// Higer Order Component
// A HOC is a component that renders one more componets.  They provide the following
// benefits:
//      - code reuse
//      - render hijacking
//      - prop manipulation
//      - abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// It's common to use the term "wrapped" when referring to wrapped components.
// Since it's a component, the first letter is capitalized.
// This is just a regular function that returns the HOC.
 const withAdminWarning = ( WrappedComponent ) => {
     // Return an HOC.  Use the spread operator to take all the key/value pairs
     // passed into this component and pass them into WrappedComponent.

     // Returning a stateless functional component....
     return (props) => (
         <div>
             {props.isAdmin && <p>This is private info.  Please don't share it!</p>}
             <WrappedComponent  { ...props }/>
         </div>
     );
}

const AdminInfo = withAdminWarning(Info);

// Commented out to test the following challenge.
// ReactDOM.render(<AdminInfo isAdmin={true} info="Here are the details" />, document.getElementById('app'));

// Challenge is to complete the following - note that for coding style, Andrew wrote it as:
// <div>
//     {props.isAuthenticated ? (
//         <WrappedComponent  { ...props }/>
//     ) : (
//         <p>Please login to view the info!</p>
//     )}
// </div>

const isAuthenticated = ( WrappedComponent ) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent  { ...props }/> : <p>Please login to view the info!</p>}
        </div>
    )
}

const AuthInfo = isAuthenticated(Info);
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Here are the details" />, document.getElementById('app'));
