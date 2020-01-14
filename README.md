sinon-clock-singleton
=======

A safer singleton wrapper around [`sinon.useFakeTimers()`](http://sinonjs.org/docs/#clock)

## Installation

Available on npm:

`npm i --save-dev sinon-clock-singleton`

## Usage

```js
const clock = require('sinon-clock-singleton');

// Creates a sinon Clock instance, and ticks forward 100ms
clock.tick(100);

// Restores the previous clock instance,
// and resets the current time to 25ms
clock.useFakeTimersSafe(25);

// Restores the system clock
clock.restore();
```

### clock.useFakeTimersSafe()

By default `sinon.useFakeTimers()` stubs out `setImmediate`, [which can wreack all sorts of havoc](https://github.com/sinonjs/sinon/issues/960).

To avoid headaches, you can use `clock.useFakeTimersSafe()`, which stubs out all methods _except_ `setImmediate`. 

## Usage in tests

If you're using a testing tool which supports `afterEach`, the clock will automatically be restored after each test.