const assert = require('assert');
const build = require('../build');

describe("build", () => {
    describe("getClassName", () => {
        it("should return correctly formatted class name", () => {
            const result = build.getClassName("world-countries.svg");
            assert.strictEqual("WorldCountries", result);
        });
    });

    describe("toTitleCase", () => {
        it("should return string in title case", () => {
            const result = build.toTitleCase("world countries");
            assert.strictEqual("World Countries", result);
        });
    });
});