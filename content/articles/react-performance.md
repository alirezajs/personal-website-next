---
title: "React Performance: Compose First, Memoize Later"
date: "2025-12-31"
summary: "Memoization is useful, but composition and state placement are the safest, cheapest wins."
coverImage: "/article-covers/react-performance.png"
tags:
  - React
  - Performance
  - Component Composition
  - JavaScript
---

When performance problems show up in React, the first instinct is often to grab
`React.memo`, `useCallback`, or `useMemo`. These APIs are powerful, but they do
not prevent renders. They only try to make a render cheaper after it already
happened.

This article argues for a simple ordering:

1. Fix component structure and state placement first.
2. Reach for memoization only when measurements prove it is worth the trade-off.

## Why memoization is not the first fix

### `React.memo`

`React.memo` skips a render only if the props are **referentially equal** to the
previous render. That means React compares props on every render. That comparison
has a cost, and it breaks easily when you pass new object/array/function
references.

This does not mean you should avoid memo entirely. It is excellent for:

- Heavy, expensive components.
- Components that re-render because of frequent parent updates.

### `useCallback`

`useCallback` does not prevent re-renders. It memoizes a function reference so
referential equality stays stable when you pass callbacks to memoized children.

Trade-offs include:

- Dependency arrays add complexity.
- It is easy to create stale closures.
- Often useless unless paired with `React.memo`.

```js
// Example of a stale closure
const increment = useCallback(() => {
  setCount(count + 1);
}, []); // Empty deps = potential stale closure
```

### `useMemo`

`useMemo` memoizes a **calculated value**, not a component. It is frequently
overused.

Common issues:

- Memoization itself has overhead.
- Cheap calculations are often faster to recompute.
- Incorrect dependencies can cause stale values.
- It becomes a "performance placebo."

### The shared limitation

All memoization hooks share a key limitation:

- The component is still in the render tree.
- React still needs to do work.
- You pay either render cost or comparison cost.

The better question is: **Why is this component rendering at all?**

## Component composition: the cheapest optimization

The most effective optimization is not rendering a component in the first place.
You get that by:

- composing components thoughtfully,
- colocating state near where it is used,
- and avoiding large "god components."

Try the example below locally or on [CodeSandbox](https://codesandbox.io/p/sandbox/react-new?utm_source=dotnew).

```js
function App() {
  const [count, setCount] = React.useState(0);

  console.log("App render");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <ExpensiveComponent />
    </div>
  );
}

function ExpensiveComponent() {
  console.log("ExpensiveComponent render");
  return <div>I am expensive</div>;
}
```

Output after clicking "Increment":

```
App render
ExpensiveComponent render
```

### What happened?

The `count` state lives in `App`. When it changes, `App` renders. React then
renders all its children, including `ExpensiveComponent`, even though it did not
change.

### Fix it without memo

Move state down into a smaller component:

```js
function Counter() {
  const [count, setCount] = React.useState(0);

  console.log("Counter render");

  return <button onClick={() => setCount((c) => c + 1)}>Increment</button>;
}

function App() {
  console.log("App render");

  return (
    <div>
      <Counter />
      <ExpensiveComponent />
    </div>
  );
}

function ExpensiveComponent() {
  console.log("ExpensiveComponent render");
  return <div>I am expensive</div>;
}
```

Output after clicking "Increment":

```
Counter render
```

### Why this scales better

- The state is scoped to `Counter`.
- `Counter` re-renders, but `App` does not.
- Siblings like `ExpensiveComponent` are skipped entirely.

**Principle:** the fastest component is the one that never re-renders.

## Summary

Memoization is valuable when used intentionally, but it should not be your first
response to performance concerns. Most real-world problems are structural:

- component hierarchy,
- state placement,
- and unnecessary shared parents.

Start with composition. Add memoization only when profiling shows it is needed.

## What is next

In the next article, we will go deeper on:

- when lifting state up is necessary,
- how to avoid unrelated re-renders in shared state,
- and when memoization is justified (and when it is still the wrong tool).
