export default class Queue<T> {
  elements: Array<T>;

  constructor() {
    this.elements = [];
  }

  enqueue = (value: T): void => {
    this.elements.push(value);
  };

  dequeue = (): T | undefined => this.elements.shift();

  isEmpty = () => this.elements.length === 0;

  peek = (): T | undefined => this.elements[0];

  length = (): number => this.elements.length;
}
