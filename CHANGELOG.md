# v2.0.1

* Bug fixes, better understanding of lolex.

# v2.0.0

* Updated to sinon v8.x
* Explicitly including sinon so NPM can resolve version differences.
* Had to remove mocks for process. timing methods because sinon and it's derivites are too complex.

# v1.1.0

* ADD: New method: `clock.useFakeTimersSafe()`
* FIX: `clock.useFakeTimers()` accepts a list of methods to stub

# v1.0.0

Initial Release
