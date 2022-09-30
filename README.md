# Test-Driven Development

A few terms in software engineering is so overloaded and misunderstood as "tdd". These three characters can have completely different meanings depending on who you ask, the person's professional and academic background and their beliefs. I've come across a lot of these different meanings myself and, to be honest, it took me more time than it should have taken to buy and read the actual book to create my understanding of what Kent Beck meant with this practice.

Nowadays I'm constantly asked about TDD's tradeoffs and the value it adds to the software engineering practice. That's why I've decided to read the book for the third time, and this time, I decided to document the examples presented in the book, write all the code and the tests, and also share my feelings, understandings and views of it.

## Why TDD?

I've asked myself this question many times before reading the book and, even after I've done so, it still took me some time to effectively start seeing the value of it in practice on a day-to-day basis. I decided to give it a formal goal when working at Yellowcam a good time ago. Back then, it was a greenfield project that I was hired to kick off the engineering part of things. It was a fast-paced environment with requirements changing daily, which made the perfect situation to start defining these requirements as tests and to let them guide the code. After six months and two thousand unit tests later, we had an MVP running in production. The API presented only a few defects, more related to domain rules not being applied correctly than to the code itself, which was, to me, the definitive demonstration of value in applying TDD. Since then I'm a regular practitioner.

## The TDD cycle

The TDD cycle goes as follows:

1. Add a test
2. Run all tests and see the new one failing
3. Make the smallest possible change to make the test pass
4. Run all tests and see them all succeed
5. Refactor to remove duplication

This is also known as "red -> green -> refactor". Whenever you need to add new code to the codebase, you write a test with some assumptions about it and the best (and cleanest) API you can think of to make it work. Then, you'll get a red bar because the functionality is not there yet. The main goal at this point is to bring the bar back to green, which we can accomplish by committing all the imaginable sins (more about it in the example below) in terms of code. After the bar is green, though, we need to start refactoring to make the code work properly.

### The simplest example

To exercise the cycle described above, the simplest example I can think of is a function to sum two numbers. Let's see how this could be approached using TDD:

**Write a test**

the test for this function would be something like this:

```javascript
describe('sum', () => {
  it('should sum two numbers and return the result', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
```

**Run all tests and see the new one failing**

This test would of course fail because `sum` doesn't exist yet. That's the red part. When we tell ourselves a story of how the code should look like when we're finished.

```
➜ yarn test
yarn run v1.22.17
$ jest
 FAIL  sum/index.test.js
  sum
    ✕ should sum two numbers and return the result (1 ms)

  ● sum › should sum two numbers and return the result

    ReferenceError: sum is not defined

      1 | describe("sum", () => {
      2 |   it("should sum two numbers and return the result", () => {
    > 3 |     expect(sum(1, 1)).toEqual(2);
        |     ^
      4 |   });
      5 | });
      6 |

      at Object.expect (sum/index.test.js:3:5)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.546 s
Ran all test suites.
```

**Make the smallest possible change to make the test pass**

The quickest way to make this test pass is by defining a `sum` function that returns `2`:

```javascript
const sum = (a, b) => 2;
```

**Run all tests and see them all succeed**

The test now pass (for a limited range of inputs, of course). But it's enough to take us to the green bar. The green bar in TDD means safety, and safety means we can change the code without worrying about breaking anything or causing unintended and hard-to-debug side effects.

```
➜ yarn test
yarn run v1.22.17
$ jest
 PASS  sum/index.test.js
  sum
    ✓ should sum two numbers and return the result (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.449 s, estimated 1 s
Ran all test suites.
✨  Done in 1.33s.
```

**Refactor to remove duplication**

Removing duplication is the last step to make our code work. What's duplication in this case, though? The duplication is in the data between the test and the code, the number `2` in our case. For this example it's easy to generalize the solution:

```javascript
const sum = (a, b) => a + b;
```

That's TDD! Now we have our code working and matching the initial requirements.

## TDD examples from the book

The book is divided in three parts and contains two concrete examples. The first of them is an implementation of a system to handle multi-currency money. The second is an implementation of a testing tool similar to xUnit.

### Part I: The Money example

In this example we implement a system able to handle multi-currency operations. We have an expression as our starting point. The expression is:

```
$5 + 10CHF = $10 if rate is 2:1
```

All the implementation details are described [here](https://github.com/kaiosilveira/tdd-money-example). Pull requests were used to implement the code for each chapter, as the continuous integration pipeline would be broken from time to time (whenever we add a new test going through the first step of the cycle, to be specific).
