// scope
// lexical scope
let a = 10
function outer() {
    let b = 20
    function inner() {
        let c = 30
        console.log(a, b, c);      
    }
    inner()
}
outer()

// closure
function outer() {
    let counter = 0
    function inner() {
        counter++
        console.log(counter);
        
    }
    inner()
}
outer() //1
outer() //1
outer() //1

// another example for closure
function outer() {
    let counter = 0
    function inner() {
        counter++
        console.log(counter);
        
    }
    console.log(inner); 
    return inner
}
const fn = outer()
fn() //1
fn() //2


// function currying
function sum(a, b, c) {
    return a + b + c
}
console.log(sum(2, 3, 4));

// transform to currying function
function curry(fn) {
   return function (a) {
      return  function (b) {
            return function(c) {
                return fn(a, b, c)
            }
        }
    }
}
const curriedSum = curry(sum)
console.log(curriedSum(2) (3) (4));

// this can be break down into below
const add2 = curriedSum(2)
const add3 = add2(3)
const add4 = add3(4)
console.log(add4);


// this keyword
// Implicit binding
const person = {
    name: 'Sudip',
    sayMyName: function() {
        console.log(`My name is ${this.name}`);
    },
}

person.sayMyName();

// this keyword
// explicit binding
globalThis.name = 'Superman' // for default binding
function sayMyName() {
    console.log(`My name is ${this.name}`);   
}

sayMyName.call(person)

// this keyword
// New binding

function Person(name) {
    // this = {}
    this.name = name
}

const p1 = new Person('Sudip')
const p2 = new Person('Papai')
console.log(p1, p2);


// Default binding
// this keyword relay on global scope
sayMyName();




// prototype
function Person(fname, lname) {
    this.fname = fname
    this.lname = lname
}

const person1 = new Person('Sudip', 'Mishra')
const person2 = new Person('Chris', 'Hemsworth')

Person.prototype.getFullName = function () {
    return `${this.fname} ${this.lname}`
}

console.log(person1.getFullName());
console.log(person2.getFullName());


// prototypal inheritance
function SuperHero(fname, lname) {
    // this = {}
    Person.call(this, fname, lname)
    this.isSuperHero = true
}

SuperHero.prototype.fightCrime = function () {
    console.log('Fighting Crime');   
}
SuperHero.prototype = Object.create(Person.prototype)

const batman1 = new SuperHero('Bruce', 'Wayne')
SuperHero.prototype.constructor = SuperHero
console.log(batman1.getFullName());


// class
class Person {
    constructor(fname, lname) {
        this.fname = fname
        this.lname = lname
    }

    sayMyName() {
        return  `${this.fname} ${this.lname}`
    }
}

const person3 = new Person('Sudip', 'Mishra')
const person4 = new Person('Chris', 'Hemsworth')

console.log(person3.sayMyName());
console.log(person4.sayMyName());

class SuperHero extends Person {
    constructor(fname, lname) {
        super(fname, lname)
        this.isSuperHero = true
    }

    fightCrime() {
        console.log('Fighting crime');
        
    }
}

const batman = new SuperHero('Bruce', 'Banner')
console.log(batman.sayMyName());



// Iterables and iterator
const str = 'Sudip'
for(let i = 0; i < str.length; i++) {
    console.log(str.charAt(i));
    
}

for(char of str) {
    console.log(char);
    
}

const arr = ['s', 'u', 'd', 'i', 'p']
for(let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    
}

for(let item of arr) {
    console.log(item);
    
}


const obj = {
    [Symbol.iterator]: function() {
        let step = 0
        const iterator = {
            next: function() {
                step++
                if(step === 1) {
                    return {value: 'Hello', done: false}
                } else if(step === 2) {
                    return {value: 'World', done: false}
                }
                return {value: undefined, done: true}
            }
        }
        return iterator
    },
}


for(const word of obj) {
    console.log(word);
    
}


// Generators

function normalFunction() {
    console.log('Hello');
    console.log('World');
}

function* generatorFunction() {
 yield 'Hello'
 yield 'World'
}

const gereratorObject = generatorFunction()
for(const word of gereratorObject) {
    console.log(word);
    
}




// Async JS
// callbacks
function greet(name) {
    console.log(`Hello ${name}`);
}

function greetSudip(greetFn) {
    const name = 'Sudip'
    greetFn(name)
}

greetSudip(greet)

function greet(name) {
    console.log(`Hello ${name}`);
}

function HigherOrderFunction(callback) {
    const name = 'Sudip'
    callback(name)
}

HigherOrderFunction(greet)

// async callback
function greet(name) {
    console.log(`Hello ${name}`);    
}
setTimeout(greet, 2000, 'Sudip')


// callback hell
function getUser(userId, callback) {
    setTimeout(() => {
        console.log('user fetched');
        callback({id: userId, name: 'Sudip'})
    },1000)
}

function getOrders(user, callback) {
    setTimeout(() => {
        console.log(`fetched orders for ${user.name}`);
        callback([{orderId: 1}, {orderId: 2}])
    },1000)
}

function getOrderDetails(order, callback) {
    setTimeout(() => {
        console.log(`fetched details for order for ${order.orderId}`);
        callback({orderId: order.orderId, item: 'Laptop'})
    },1000)
}

function processPayment(orderDetails, callback) {
    setTimeout(() => {
        console.log(`Processed payment for ${orderDetails.item}`);
        callback();
    }, 1000);
}

getUser(101, (user) => {
    console.log(user);  
    getOrders(user, (orders) => {
        console.log(orders);     
        getOrderDetails(orders[0], (orderDetails) => {
            console.log(orderDetails);     
            processPayment(orderDetails, () => {
                console.log('Payment complete!');    
            })
        })
    })
})


// solution using promise
function getUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('user fetched');
            resolve({id: userId, name: 'Sudip'})
        },1000)

    })
}

function getOrders(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`fetched orders for ${user.name}`);
            resolve([{orderId: 1}, {orderId: 2}])
        },1000)

    })
}

function getOrderDetails(order) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`fetched details for order for ${order.orderId}`);
            resolve({orderId: order.orderId, item: 'Laptop'})
        },1000)

    })
}

function processPayment(orderDetails) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Processed payment for ${orderDetails.item}`);
            resolve();
        }, 1000);

    })
}

getUser(101)
.then(getOrders)
.then((order) => getOrderDetails(order[0]))
.then(processPayment)
.then(() => 
    console.log('process completed'))
    .catch((error) => 
    console.log("Error", error)
    )




// using async/await

async function processOrder() {
    try {
        const user = await getUser(101)
        const orders = await getOrders(user)
        const orderDetails = await getOrderDetails(orders[0])
        await processPayment(orderDetails) 
        console.log('Process completed!');
    }
    catch(error) {
        console.error("Error", error);       
    }
}
processOrder();


