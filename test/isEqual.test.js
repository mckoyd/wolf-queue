const isEqual = require("../src/utils/isEqual");
const {
  TEST_ARRAY,
  TEST_STRING,
  TEST_OBJECT,
  TEST_BOOLEAN,
  TEST_NUMBER
} = require("./utils/constants");

describe("`isEqual` method", () => {
  it("Should check equality of two numbers", () => {
    let a = TEST_NUMBER,
      b = TEST_NUMBER;
    expect(isEqual(a, b)).toEqual(true);
    b += TEST_NUMBER;
    expect(isEqual(a, b)).toEqual(false);
  });

  it("Should check equality of two booleans", () => {
    let a = TEST_BOOLEAN,
      b = TEST_BOOLEAN;
    expect(isEqual(a, b)).toEqual(true);
    b = !TEST_BOOLEAN;
    expect(isEqual(a, b)).toEqual(false);
  });

  it("Should check equality of two functions", () => {
    let a = () => {};
    b = () => {};
    expect(isEqual(a, b)).toEqual(true);
    b = name => `Different ${name}`;
    expect(isEqual(a, b)).toEqual(false);
  });

  it("Should check equality of two arrays", () => {
    const a = [TEST_ARRAY];
    b = [TEST_ARRAY];
    expect(isEqual(a, b)).toEqual(true);
    b.push(TEST_NUMBER);
    expect(isEqual(a, b)).toEqual(false);
  });

  it("Should check equality of two objects", () => {
    const a = { TEST_OBJECT, fn: () => {}, obj: { a: "testing" } };
    b = { TEST_OBJECT, fn: () => {}, obj: { a: "testing" } };
    expect(isEqual(a, b)).toEqual(true);
    b.fn = () => "new funtion";
    expect(isEqual(a, b)).toEqual(false);
    b.fn = "different type";
    expect(isEqual(a, b)).toEqual(false);
    b.fn = () => {};
    expect(isEqual(a, b)).toEqual(true);
    a.obj = { a: "testing" };
    b.obj = { a: "test" };
    expect(isEqual(a, b)).toEqual(false);
  });
});
