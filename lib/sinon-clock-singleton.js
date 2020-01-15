const sinon = require('sinon');

let clockInstance = null;

/**
 * A singleton wrapper around sinon.Clock.
 * It's self-cleaning in mocha tests, and allows resetting the time.
 * @type {{restore: clock.restore, useFakeTimers: clock.useFakeTimers}}
 */
const clock = {
	restore:           () => {
		if (clockInstance) {
			clockInstance.restore();
			clockInstance = null;
		}
	},
	useFakeTimers:     function (dateOrConfig) {
		clock.restore();
		clockInstance = sinon.useFakeTimers.apply(sinon, [dateOrConfig]);
	},
	/**
	 * Creates a sinon clock instance,
	 * without stubbing `setImmediate`
	 *
	 * See
	 * https://github.com/sinonjs/sinon/issues/960
	 */
	useFakeTimersSafe: function (dateOrConfig) {
		const lolexDefaultFakes = ['setTimeout', 'clearTimeout', 'setImmediate', 'clearImmediate', 'setInterval',
			'clearInterval', 'Date', 'requestAnimationFrame', 'cancelAnimationFrame', 'requestIdleCallback',
			'cancelIdleCallback', 'hrtime'];

		// setImmediate shouldn't be stubbed out, it's a more sensical nextTick (puts the user's call at the end of
		// the stack)
		const setImmediateIndex = lolexDefaultFakes.indexOf('setImmediate');
		lolexDefaultFakes.splice(setImmediateIndex, 1);

		let defaultConfig = {
			now:    0,
			toFake: lolexDefaultFakes
		};

		let hasArguments = typeof dateOrConfig !== 'undefined';
		let argumentIsDateLike =
			(typeof dateOrConfig === 'number' || dateOrConfig instanceof Date) && arguments.length === 1;
		let argumentIsObject = dateOrConfig !== null && typeof dateOrConfig === 'object' && arguments.length === 1;

		if (!hasArguments) {
			return clock.useFakeTimers.apply(clock, [defaultConfig]);
		}

		if (argumentIsDateLike) {
			return clock.useFakeTimers.apply(clock, [{
				...defaultConfig,
				now: dateOrConfig,
			}]);
		}

		if (argumentIsObject) {
			return clock.useFakeTimers.apply(clock, [{
				...defaultConfig,
				...dateOrConfig,
			}]);
		}
	},
	tick:              (ms) => {
		if (!clockInstance) {
			clock.useFakeTimers();
		}
		clockInstance.tick(ms);
	},
};

try {
	if (afterEach) {
		afterEach(() => clock.restore());
	}
} catch (e) {
	if (e instanceof ReferenceError) {
		// This is okay, we'll just skip auto plugging in our tear down.
	} else {
		throw e;
	}
}

module.exports = clock;
