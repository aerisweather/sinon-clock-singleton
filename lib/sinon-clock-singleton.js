const sinon = require('sinon');

var clockInstance = null;

/**
 * A singleton wrapper around sinon.Clock.
 * It's self-cleaning in mocha tests, and allows resetting the time.
 * @type {{restore: clock.restore, useFakeTimers: clock.useFakeTimers}}
 */
const clock = {
	restore: () => {
		if (clockInstance) {
			clockInstance.restore();
			clockInstance = null;
		}
	},
	useFakeTimers: function(time, var_stubbedMethods) {
		clock.restore();
		clockInstance = sinon.useFakeTimers.apply(sinon, arguments);
	},
	/**
	 * Creates a sinon clock instance,
	 * without stubbing `setImmediate`
	 *
	 * See
	 * https://github.com/sinonjs/sinon/issues/960
	 */
	useFakeTimersSafe: function() {
		const args = [].slice.call(arguments, 0);
		const time = args.length ? args[0] : Date.now();
		const stubbedMethods = args.length > 1 ?
			args.slice(1) :
			// Stub everything except setImmediate
			['Date', 'setInterval', 'clearInterval', 'setTimeout', 'clearTimeout'];

		clock.useFakeTimers.apply(clock, [time].concat(stubbedMethods));
	},
	tick: (ms) => {
		if (!clockInstance) { clock.useFakeTimers();}
		clockInstance.tick(ms);
	}
};

if (afterEach) {
	afterEach(() => clock.restore());
}

module.exports = clock;