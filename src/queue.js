const Node = require("./node");
const isEqual = require("./utils/isEqual");

class Queue {
  constructor(arrOfVals) {
    this._queue = null;
    this._tail = null;
    this._minMaxVals = [];
    this._size = 0;
    if (arrOfVals && arrOfVals.length) arrOfVals.forEach(val => this.add(val));
  }

  get size() {
    return this._size;
  }

  get min() {
    const minMaxLength = this._minMaxVals.length;
    if (minMaxLength) return this._minMaxVals[minMaxLength - 1][0];
    else throw new Error("There are no numeric values in this queue.");
  }

  get max() {
    const minMaxLength = this._minMaxVals.length;
    if (minMaxLength) return this._minMaxVals[minMaxLength - 1][1];
    else throw new Error("There are no numeric values in this queue.");
  }

  get last() {
    return this._tail && this._tail.data;
  }

  set size(size) {
    this._size = size;
  }

  set _minAndMax(data) {
    const top = this.peek();
    if (!top) this._minMaxVals.push([data, data]);
    else {
      const currentMinMax = (this._minMaxVals &&
        this._minMaxVals[this._minMaxVals.length - 1]) || [null, null];
      this._minMaxVals.push([
        Math.min(data, currentMinMax[0] ? currentMinMax[0] : data),
        Math.max(data, currentMinMax[1] ? currentMinMax[1] : data)
      ]);
    }
  }

  peek() {
    if (this._queue) return this._queue.data;
  }

  isEmpty() {
    return this._queue === null;
  }

  add(data) {
    if (!isNaN(data)) this._minAndMax = data;
    const node = new Node(data, null);
    if (!this._queue) this._queue = node;
    else this._tail.next = node;
    this._tail = node;
    this._size++;
  }

  remove() {
    if (!this._queue) return undefined;
    const removedData = this.peek();
    this._queue = this._queue.next;
    this._minMaxVals.pop();
    this._size--;
    if (this._size < 1) this._tail = null;
    return removedData;
  }

  has(data) {
    let node = this._queue;
    if (!node) return false;
    while (node) {
      if (isEqual(node.data, data)) return true;
      node = node.next;
    }
    return false;
  }

  reverse() {
    let node = this._queue,
      next = null,
      prev = null,
      newTail = null;
    while (node) {
      next = node.next;
      node.next = prev;
      prev = node;
      if (!newTail) newTail = node;
      node = next;
    }
    this._queue = prev;
    this._tail = newTail;
  }

  clear() {
    if (this._queue) {
      this._queue = null;
      this._min = [];
      this.size = 0;
    }
  }

  print() {
    const queueItems = [];
    let node = this._queue;
    (function printHelper(node) {
      if (!node) return;
      const data = node.data;
      queueItems.push(data);
      printHelper(node.next);
    })(node);
    console.dir(queueItems);
  }
}

module.exports = Queue;
