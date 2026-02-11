// Iterator Interface
class Iterator {
  hasNext() {
    throw new Error("hasNext() must be implemented");
  }

  next() {
    throw new Error("next() must be implemented");
  }

  current() {
    throw new Error("current() must be implemented");
  }

  reset() {
    throw new Error("reset() must be implemented");
  }
}

// Concrete Iterators
class ArrayIterator extends Iterator {
  constructor(collection) {
    super();
    this.collection = collection;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.collection.length;
  }

  next() {
    return this.collection[this.index++];
  }

  current() {
    return this.collection[this.index];
  }

  reset() {
    this.index = 0;
  }

  // Additional iterator features
  forEach(callback) {
    while (this.hasNext()) {
      callback(this.next());
    }
    this.reset();
  }
}

class ReverseArrayIterator extends Iterator {
  constructor(collection) {
    super();
    this.collection = collection;
    this.index = collection.length - 1;
  }

  hasNext() {
    return this.index >= 0;
  }

  next() {
    return this.collection[this.index--];
  }

  current() {
    return this.collection[this.index];
  }

  reset() {
    this.index = this.collection.length - 1;
  }
}

class LinkedListIterator extends Iterator {
  constructor(linkedList) {
    super();
    this.linkedList = linkedList;
    this.currentNode = linkedList.head;
  }

  hasNext() {
    return this.currentNode !== null;
  }

  next() {
    const data = this.currentNode.data;
    this.currentNode = this.currentNode.next;
    return data;
  }

  current() {
    return this.currentNode ? this.currentNode.data : null;
  }

  reset() {
    this.currentNode = this.linkedList.head;
  }
}

class FilterIterator extends Iterator {
  constructor(iterator, predicate) {
    super();
    this.iterator = iterator;
    this.predicate = predicate;
    this.currentElement = null;
    this.advanceToNextValid();
  }

  advanceToNextValid() {
    this.currentElement = null;
    while (this.iterator.hasNext() && !this.currentElement) {
      const element = this.iterator.next();
      if (this.predicate(element)) {
        this.currentElement = element;
      }
    }
  }

  hasNext() {
    return this.currentElement !== null;
  }

  next() {
    const result = this.currentElement;
    this.advanceToNextValid();
    return result;
  }

  current() {
    return this.currentElement;
  }

  reset() {
    this.iterator.reset();
    this.advanceToNextValid();
  }
}

// Collection Interfaces
class IterableCollection {
  createIterator() {
    throw new Error("createIterator() must be implemented");
  }
}

// Concrete Collections
class NumberCollection extends IterableCollection {
  constructor(numbers = []) {
    super();
    this.numbers = numbers;
  }

  add(number) {
    this.numbers.push(number);
  }

  remove(index) {
    return this.numbers.splice(index, 1)[0];
  }

  createIterator() {
    return new ArrayIterator(this.numbers);
  }

  createReverseIterator() {
    return new ReverseArrayIterator(this.numbers);
  }

  getEvenIterator() {
    return new FilterIterator(
      new ArrayIterator(this.numbers),
      (num) => num % 2 === 0,
    );
  }

  getOddIterator() {
    return new FilterIterator(
      new ArrayIterator(this.numbers),
      (num) => num % 2 !== 0,
    );
  }

  getGreaterThanIterator(threshold) {
    return new FilterIterator(
      new ArrayIterator(this.numbers),
      (num) => num > threshold,
    );
  }
}

class LinkedList extends IterableCollection {
  constructor() {
    super();
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  add(data) {
    const node = { data, next: null };

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
    return this;
  }

  createIterator() {
    return new LinkedListIterator(this);
  }
}

export {
  ArrayIterator,
  ReverseArrayIterator,
  LinkedListIterator,
  FilterIterator,
  IterableCollection,
  NumberCollection,
  LinkedList,
};
