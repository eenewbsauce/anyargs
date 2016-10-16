# AnyArgs
A small utility module that converts function arguments to an object for use within the function based on a supplied metadata object. This allows parameters to be passed in any order, making the resultant function very flexible.

## Features
- Adds type safety to function parameters
- Adds ability to specify default parameters in any order
- Adds ability to pass parameters in any order
- Adds ability to skip parameters at any position in the function signature

## NPM

Official home on NPM: [https://www.npmjs.com/package/anyargs](https://www.npmjs.com/package/anyargs)

## Github

Official home on Github: [https://github.com/eenewbsauce/anyargs](https://github.com/eenewbsauce/anyargs)

## Setup

- Install the module

  `npm i anyargs`

## Usage
Add anyargs to your function

- anyargs does not support multiple keys having the same type in the metadata object.

```javascript
let anyArgs = require('anyargs');

function add(one, two, cb) {
  let metadata = {
    one: {
      type: 'number',
      required: true
    },
    two: {
      type: 'string',
      required: true
    },
    cb: {
      type: 'function',
      required: false,
      defaultValue: function() {}
    }
  };

  let args = anyArgs(arguments, metadata);

  return new Promise((resolve, reject) => {
    let sum = args.one + parseInt(args.two);
    resolve(sum);
    args.cb(sum);
  });
}
```
 Use function how ever you'd like

 ```javascript
 let sum = add(1,'2', function(sum) {
   console.log(sum) //3   
 });

 let sumV2 = add(function(sum) {
   console.log(sum) // 7
 }, '3', 4);
 ```

## Tests

Run test suite

`npm test`
