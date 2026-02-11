// Strategy Interface
class SortStrategy {
  sort(data) {
    throw new Error("sort() method must be implemented");
  }
}

// Concrete Strategies
class AscendingSort extends SortStrategy {
  sort(data) {
    return [...data].sort((a, b) => a - b);
  }
}

class DescendingSort extends SortStrategy {
  sort(data) {
    return [...data].sort((a, b) => b - a);
  }
}

class StringLengthSort extends SortStrategy {
  sort(data) {
    return [...data].sort((a, b) => a.length - b.length);
  }
}

class RandomSort extends SortStrategy {
  sort(data) {
    return [...data].sort(() => Math.random() - 0.5);
  }
}

class BubbleSort extends SortStrategy {
  sort(data) {
    const arr = [...data];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class SelectionSort extends SortStrategy {
  sort(data) {
    const arr = [...data];
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
  }
}

// Context
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(data) {
    console.log(`\n🔍 Using strategy: ${this.strategy.constructor.name}`);
    const start = performance.now();
    const result = this.strategy.sort(data);
    const end = performance.now();
    console.log(`   Result: [${result.join(", ")}]`);
    console.log(`   Time: ${(end - start).toFixed(3)}ms`);
    return result;
  }
}

// Export for module usage
export {
  SortStrategy,
  AscendingSort,
  DescendingSort,
  StringLengthSort,
  RandomSort,
  BubbleSort,
  SelectionSort,
  Sorter
};
