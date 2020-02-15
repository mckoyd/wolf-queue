# Wolf Queue

## A lightweight implementation of a queue data structure.

| Properties | Property Descriptions                                 |
| :--------- | :---------------------------------------------------- |
| `max`      | returns the maximum numeric value stored in the queue |
| `last`     | returns the last value in the queue                   |
| `size`     | returns the amount of values stored in the queue      |

| Methods (In Constant Time) | Method Descriptions                                      |
| :------------------------- | :------------------------------------------------------- |
| `add(value)`               | adds a value to the queue                                |
| `isEmpty()`                | returns a boolean indicating if the queue has any values |
| `peek()`                   | returns the first value in the queue                     |
| `remove()`                 | removes the first value in the queue                     |
| `clear()`                  | removes all values from the queue                        |

| Methods (In Linear Time) | Method Descriptions                                                 |
| :----------------------- | :------------------------------------------------------------------ |
| `has(value)`             | returns a boolean indicating if the queue contains the passed value |
| `print`                  | logs all the values of the queue to the console as a string         |
| `reverse`                | reverses the order of the queue in place                            |
