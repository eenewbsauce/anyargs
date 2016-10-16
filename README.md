# AnyArgs
A small utility module that converts function arguments to an object for use within the function based on a supplied metadata object. This allows parameters to be passed in any order, making the resultant function very flexible.

## Setup

- Install the module

  `npm i anyargs`

## Usage
Add anyargs to your function

```javascript
let anyArgs = require('anyargs').parse;

function add(one, two, cb) {
  let metadata = {
    one: {
      type: 'number',
      required: true
    },
    two: {
      type: 'number',
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
    let sum = args.one + args.two;
    resolve(sum);
    cb(sum);
  });
}
```
 Use function how ever you'd like

 ```javascript
 let sum = add(1,2, function(sum) {
   console.log(sum) //3   
 });

 let sumV2 = add(function(sum) {
   console.log(sum) // 7
 }, 3, 4);
 ```

## Tests

Run test suite

`npm test`
