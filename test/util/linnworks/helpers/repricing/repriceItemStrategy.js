const { repriceItemStrategy } = require("../../../../../util/linnworks/helpers/repricing/repriceItemStrategy");

var assert = require("assert");
var expect = require("chai").expect;
var should = require("chai").should();

describe("-- Item Repricing | repriceItemStrategy.js --", function () {
  describe("Price is NAN | non number check", function () {
    it("it should return false when NAN", function () {
      const result = repriceItemStrategy("ten");
      result.should.equal(false);
    });
  });

  describe("Price at cutoff | equal to 14.99", function () {
    it("it should return false when less than or equal to 14.99", function () {
      const result = repriceItemStrategy(14.99);
      result.should.equal(false);
    });
  });

  describe("Price below cutoff | 14.99", function () {
    it("it should return false when less than or equal to 14.99", function () {
      const result = repriceItemStrategy(12.99);
      result.should.equal(false);
    });
  });

  describe("Reprice example test 1 | 229.99", function () {
    it("it should return 206.99", function () {
      const result = repriceItemStrategy(229.99);
      result.should.equal(206.99);
    });
  });

  describe("Reprice example test 1 | 29.99", function () {
    it("it should return 26.99", function () {
      const result = repriceItemStrategy(29.99);
      result.should.equal(26.99);
    });
  });

  describe("Reprice example test 2 | 27.49", function () {
    it("it should return 24.74", function () {
      const result = repriceItemStrategy(27.49);
      result.should.equal(24.74);
    });
  });

  describe("Reprice example test 3 | 17.49", function () {
    it("it should return 15.74", function () {
      const result = repriceItemStrategy(17.49);
      result.should.equal(15.74);
    });
  });

  describe("Repriced to exact cutoff | 16.49 ", function () {
    it("it should return 14.99", function () {
      const result = repriceItemStrategy(16.49);
      result.should.equal(14.99);
    });
  });

  describe("Repriced to below cutoff | 15.50 so only go to 14.99 ", function () {
    it("it should return 14.99 as this would reprice to below 14.99", function () {
      const result = repriceItemStrategy(15.5);
      result.should.equal(14.99);
    });
  });
});
