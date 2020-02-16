const Node = require("../src/node");
const { TEST_STRING, TEST_BOOLEAN } = require("./utils/constants");

const setup = (nodeValue, nextValue) => new Node(nodeValue, nextValue);

describe("Creating a New Node", () => {
  it("Should create a Node object with data and next values when passed as arguments", () => {
    expect.assertions(5);
    const testNode = setup(TEST_STRING, TEST_BOOLEAN);
    expect(testNode).toBeDefined();
    expect(testNode).not.toBeNull();
    expect(testNode).toBeInstanceOf(Node);
    expect(testNode).toHaveProperty("data", TEST_STRING);
    expect(testNode).toHaveProperty("next", TEST_BOOLEAN);
  });

  it("Should create a Node object with null data and next values when no arguments are passed", () => {
    expect.assertions(5);
    const testNode = setup();
    expect(testNode).toBeDefined();
    expect(testNode).not.toBeNull();
    expect(testNode).toBeInstanceOf(Node);
    expect(testNode).toHaveProperty("data", null);
    expect(testNode).toHaveProperty("next", null);
  });
});
