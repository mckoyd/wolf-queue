const Queue = require("../src/queue");
const {
  TEST_ARRAY,
  TEST_STRING,
  TEST_OBJECT,
  TEST_BOOLEAN,
  TEST_NUMBER
} = require("./utils/constants");

const nativeConsoleDir = console.dir;
const setup = arrOfValues => new Queue(arrOfValues);
const teardown = () => (console.dir = nativeConsoleDir);

describe("Creating a Queue and Using Queue Methods", () => {
  it("`new Queue()` should create an empty queue on instantiation", () => {
    expect.assertions(4);
    const testQueue = setup();
    expect(testQueue).toEqual(new Queue());
    expect(testQueue).toBeDefined();
    expect(testQueue).not.toBeNull();
    expect(testQueue).toBeInstanceOf(Queue);
  });

  it("`new Queue([<values>])` should create a queue containing values passed via array", () => {
    expect.assertions(8);
    const arrOfValues = [TEST_ARRAY, TEST_NUMBER, TEST_OBJECT];
    const testQueue = setup(arrOfValues);
    expect(testQueue).toBeDefined();
    expect(testQueue).not.toBeNull();
    expect(testQueue).toBeInstanceOf(Queue);
    expect(testQueue.size).toEqual(arrOfValues.length);
    expect(testQueue.max).toEqual(TEST_NUMBER);
    expect(testQueue.min).toEqual(TEST_NUMBER);
    expect(testQueue.peek()).toEqual(TEST_ARRAY);
    expect(testQueue.last).toEqual(TEST_OBJECT);
  });

  it("`q.size` should return the size of the queue", () => {
    expect.assertions(3);
    const arrOfValues = [TEST_BOOLEAN, TEST_NUMBER, TEST_OBJECT, TEST_STRING];
    const testQueue = setup(arrOfValues);
    expect(testQueue.size).toEqual(arrOfValues.length);
    testQueue.remove();
    testQueue.remove();
    expect(testQueue.size).toEqual(arrOfValues.length - 2);
    testQueue.remove();
    testQueue.remove();
    expect(testQueue.size).toEqual(0);
  });

  it("`q.max` should return the maximum numeric value of the queue", () => {
    expect.assertions(3);
    const arrOfValues = [
      TEST_STRING,
      TEST_NUMBER,
      TEST_NUMBER / 34,
      TEST_NUMBER * 5,
      TEST_NUMBER - 100
    ];
    const testQueue = setup(arrOfValues);
    expect(testQueue.max).toEqual(TEST_NUMBER * 5);
    testQueue.remove();
    testQueue.remove();
    expect(testQueue.max).toEqual(TEST_NUMBER);
    testQueue.remove();
    testQueue.remove();
    expect(() => testQueue.max).toThrowError(
      "There are no numeric values in this queue."
    );
  });

  it("`q.min` should return the minimum numeric value of the queue", () => {
    expect.assertions(3);
    const arrOfValues = [
      TEST_STRING,
      TEST_NUMBER,
      TEST_NUMBER * 5,
      TEST_NUMBER / 23,
      TEST_NUMBER - 100
    ];
    const testQueue = setup(arrOfValues);
    expect(testQueue.min).toEqual(TEST_NUMBER / 23);
    testQueue.remove();
    testQueue.remove();
    expect(testQueue.min).toEqual(TEST_NUMBER);
    testQueue.remove();
    testQueue.remove();
    expect(() => testQueue.min).toThrowError(
      "There are no numeric values in this queue."
    );
  });

  it("`q.last` should return the last value in the queue", () => {
    expect.assertions(3);
    const arrOfValues = [TEST_BOOLEAN, TEST_NUMBER];
    const testQueue = setup(arrOfValues);
    expect(testQueue.last).toEqual(TEST_NUMBER);
    testQueue.remove();
    expect(testQueue.last).toEqual(TEST_NUMBER);
    testQueue.remove();
    expect(testQueue.last).toBeNull();
  });

  it("`q.isEmpty()` should return a boolean indicating if the queue is empty", () => {
    expect.assertions(6);
    const testQueue = setup();
    expect(testQueue).toEqual(new Queue());
    expect(testQueue).toBeDefined();
    expect(testQueue).not.toBeNull();
    expect(testQueue).toBeInstanceOf(Queue);
    expect(testQueue.isEmpty()).toEqual(true);
    testQueue.add(TEST_NUMBER);
    expect(testQueue.isEmpty()).toEqual(false);
  });

  it("`q.add(<value>)` should add data to the queue", () => {
    expect.assertions(3);
    const testQueue = setup();
    testQueue.add(TEST_NUMBER);
    expect(testQueue.peek()).toEqual(TEST_NUMBER);
    testQueue.add(TEST_OBJECT);
    expect(testQueue.peek()).toEqual(TEST_NUMBER);
    expect(testQueue.last).toEqual(TEST_OBJECT);
  });

  it("`q.remove()` should remove data from the queue", () => {
    expect.assertions(10);
    const testQueue = setup();
    testQueue.add(TEST_ARRAY);
    testQueue.add(TEST_STRING);
    testQueue.add(TEST_NUMBER);
    expect(testQueue.peek()).toEqual(TEST_ARRAY);
    expect(testQueue.last).toEqual(TEST_NUMBER);
    expect(testQueue.remove()).toEqual(TEST_ARRAY);
    expect(testQueue.last).toEqual(TEST_NUMBER);
    expect(testQueue.peek()).not.toEqual(TEST_ARRAY);
    expect(testQueue.remove()).toEqual(TEST_STRING);
    expect(testQueue.remove()).toEqual(TEST_NUMBER);
    expect(testQueue.peek()).not.toEqual(TEST_ARRAY);
    expect(testQueue.isEmpty()).toEqual(true);
    expect(testQueue.remove()).toEqual(undefined);
  });

  it("`q.has(<value>)` should return a boolean indicating if passed data is in the queue", () => {
    expect.assertions(5);
    const testQueue = setup([
      TEST_NUMBER,
      TEST_OBJECT,
      TEST_STRING,
      TEST_ARRAY
    ]);
    expect(testQueue.has(TEST_NUMBER)).toEqual(true);
    expect(testQueue.has(TEST_OBJECT)).toEqual(true);
    expect(testQueue.has(TEST_ARRAY)).toEqual(true);
    expect(testQueue.has(TEST_BOOLEAN)).toEqual(false);
    testQueue.clear();
    expect(testQueue.has(TEST_NUMBER)).toEqual(false);
  });

  it("`q.reverse()` should reverse the order of the queue", () => {
    expect.assertions(5);
    const testQueue = setup([
      TEST_NUMBER,
      TEST_OBJECT,
      TEST_STRING,
      TEST_ARRAY
    ]);
    expect(testQueue.peek()).toEqual(TEST_NUMBER);
    expect(testQueue.last).toEqual(TEST_ARRAY);
    testQueue.reverse();
    expect(testQueue.peek()).toEqual(TEST_ARRAY);
    expect(testQueue.last).toEqual(TEST_NUMBER);
    testQueue.remove();
    expect(testQueue.peek()).toEqual(TEST_STRING);
  });

  it("`q.clear()` should clear all data from the queue", () => {
    expect.assertions(6);
    const arrOfValues = [TEST_BOOLEAN, TEST_NUMBER, TEST_OBJECT, TEST_STRING];
    const testQueue = setup(arrOfValues);
    expect(testQueue.size).toEqual(arrOfValues.length);
    expect(testQueue.isEmpty()).toEqual(false);
    testQueue.clear();
    expect(testQueue.size).toEqual(0);
    expect(testQueue.isEmpty()).toEqual(true);
    testQueue.clear();
    expect(testQueue.size).toEqual(0);
    expect(testQueue.isEmpty()).toEqual(true);
  });

  it("`q.print()` should print a directory of data from the queue to the console", () => {
    const arrOfValues = [TEST_BOOLEAN, TEST_NUMBER, TEST_OBJECT, TEST_STRING];
    const testQueue = setup(arrOfValues);
    let expectedOutput = [];
    const mockedConsoleDir = output => expectedOutput.push(output);
    console.dir = mockedConsoleDir;
    testQueue.print();
    expect(expectedOutput).toEqual([arrOfValues]);
    expectedOutput = [];
    teardown();
    testQueue.print();
    expect(expectedOutput).toEqual([]);
  });
});
