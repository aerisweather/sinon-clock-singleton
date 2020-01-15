const assert = require('assert');
const clockSingleton = require('../lib/sinon-clock-singleton');

describe("Clock Singleton", () => {
	it("should instantiate quickly with .tick()", () => {
		clockSingleton.tick(50);
		const mockedDate = new Date();
		assert.equal(mockedDate.getTime(), 50)
	});

	it("should useFakeTimers as default", () => {
		clockSingleton.useFakeTimers();
		const mockedDate = new Date();
		assert.equal(mockedDate.getTime(), 0);
	});

	it("should useFakeTimers with default time", () => {
		clockSingleton.useFakeTimers(123);
		const mockedDate = new Date();
		assert.equal(mockedDate.getTime(), 123);
	});

	it("should allow setImmediate by default", async () => {
		clockSingleton.useFakeTimersSafe();
		await immediate();
		assert.ok(true);
	})

	it("should set our Date()", async () => {
		clockSingleton.useFakeTimersSafe(123);
		const mockedDate = new Date();
		assert.equal(mockedDate.getTime(), 123);
	})
});

async function immediate() {
	return new Promise(onRes => setImmediate(onRes));
}
