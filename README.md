sinon-clock-singleton
=======

Singleton wrapper around [`sinon.useFakeTimers()`](http://sinonjs.org/docs/#clock)

## Usage

```js
const clock = require('sinon-clock-singleton');

// Creates a sinon Clock instance, and ticks forward 100ms
clock.tick(100);

// Restores the previous clock instance,
// and resets the current time to 25ms
clock.useFakeTimers(25);

// Restores the system clock
clock.restore();
```

## Usage in tests

If you're using a testing tool which supports `afterEach`, the clock will automatically be restored after each test.