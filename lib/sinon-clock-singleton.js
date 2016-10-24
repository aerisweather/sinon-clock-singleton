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
	tick: (ms) => {
		if (!clockInstance) { clock.useFakeTimers();}
		clockInstance.tick(ms);
	}
};

if (afterEach) {
	afterEach(() => clock.restore());
}

module.exports = clock;