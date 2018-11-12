console.log("ES6 Destructuring");

const person = {
    name: 'Patty',
    age: 63,
    location: {
        city: 'Palo Alto',
        temp: 70
    }
};

// These are the same thing.......const can be let or var as well...
// const name = person.name;
// const age = person.age;
const {name, age } = person;

// Notice these are back-ticks...goal is to something like this
// without assigning separate consts as above.
console.log(`${name} is ${age}.`)

// Likewise, the following are identical:
if (person.location.city && person.location.temp) {
    console.log(`It's ${person.location.temp} in ${person.location.city}.`);
}

const { city, temp } = person.location;
if (city && temp) {
    console.log(`It's ${temp} in ${city}.`);
}

// To use a different name for the local variable:
const { city: myCity, temp: localTemperature } = person.location;
console.log(`It's ${localTemperature} in ${myCity}.`);

// You can add default values - along with renaming....needed here since we've
// defined the local variables name and age above..
const { name: myName =  'Anonymous', age: myAge } = person;
console.log(`${myName} is ${myAge}.`)

// Challenge: Print the publisher name, defaulting to "Self-Publshed" if no publisher is provided
// in the object.
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// }
//
// const { name: publisherName = 'Self-Published' } = book.publisher;
// console.log(publisherName);
//

// Array destructuring

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// Local variables are matched by position:
const [ street, localCity, state, zip] = address;

/// The following are identical:
console.log(`You are in ${address[1]}, ${address[2]}.`);
console.log(`You are in ${localCity}, ${state}.`);


// Challenge is to print the following using the given array using array destructuring:
// console.log('A medium Coffee (hot) costs $2.50');
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [coffeeType, smallPrice, mediumPrice, laregPrice] = item;
console.log(`A medium ${coffeeType} costs ${mediumPrice}.`);
