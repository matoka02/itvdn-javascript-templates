"use strict";

// Standard and arrow functions

function calculateSum(a, b) {
  // console.log(arguments);
  return a + b;
}
console.log("result:", calculateSum(10, 5));

// console.log('result second:', multiplyNumbers(2, 3));
const multiplyNumbers = function (a, b) {
  return a * b;
};
console.log("result second:", multiplyNumbers(2, 3));

// Arrow function with spread/rest operator

const calculateSum2 = (a, b) => {
  // console.log(arguments);
  return a + b;
};
console.log("result three:", calculateSum2(10, 5));

const arrowFunction = (...args) => {
  console.log(args);
  console.log("index", args[0]);
  console.log("length", args.length);
  args.forEach((i) => console.log("item", i));
};
arrowFunction(1, 2, 3, 4, 5, 6);

// Function with arguments array

function usualFunction() {
  // console.log(arguments);
  // const argArray = Array.from(arguments)
  // console.log(arguments);
  const argArray = [...arguments];
  console.log(argArray);
  console.log("index argArray", argArray[2]);
  console.log("length argArray", argArray.length);
  argArray.forEach((i) => console.log("argArray item", i));
}
usualFunction(1, 2, 3, 4, 5, 6);

//Immediately Invoked Function Expression (IIFE)

(function () {
  console.log("hello I am IIFE");
})();

// Callback functions

function handleClick(event) {
  console.log("Clicked!", event.target);
}
document.getElementById("myButton").addEventListener("click", handleClick);

// Closing
function outerFunction(outerVariable) {
  function innerFunction(innerVariable) {
    console.log("outerVariable:", outerVariable);
    console.log("innerVariable:", innerVariable);
  }
  return innerFunction;
}
const closure = outerFunction("outerValue");
closure("innerValue");

// Currying

function firstFunc() {
  return function () {
    return "second function";
  };
}
const result = firstFunc();
console.log("result", result());

// Memoization

function getVideoInfo(videoId) {
  const cache = {};

  return function (videoId) {
    if (!cache[videoId]) {
      console.log(
        "Request to the server to get information about the video with ID:",
        videoId,
      );
      cache[videoId] = {
        title: "Video title",
        duration: "Video duration",
        author: "Video author",
      };
    }
    return cache[videoId];
  };
}

const memoizedGetVideoInfo = getVideoInfo();
console.log(memoizedGetVideoInfo(123));
console.log(memoizedGetVideoInfo(123));
