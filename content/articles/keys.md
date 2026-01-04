---
title: "React Keys: Why Index Breaks Identity (and When Keys Are Powerful)"
date: "2024-10-22"
summary: "Keys are identity, not order. Learn why index keys cause bugs and how to use keys intentionally."
tags:
  - React
  - JavaScript
  - Performance
  - UI State
hidden: true
---

React keys are easy to dismiss until they cause a bug that feels random. The
docs warn against using array indexes as keys when a list can change, but the
real reason is deeper: **keys define identity**, not order.

Here is the mental model, the failure mode, and the correct way to think about
keys.

## 1. What a key does in React

During reconciliation React asks a simple question:

> Is this the same component instance as before?

If the key matches:

- Component state is preserved.
- Effects stay attached.
- DOM nodes are reused or moved.

If the key changes:

- The component is destroyed.
- State is lost.
- Effects are cleaned up.
- A new instance is created.

Keys define identity, not position.

## 2. What happens when you use index as key

```jsx
{
  items.map((item, index) => <Item key={index} item={item} />);
}
```

This tells React: "Identity is based on position." That works **only** if the
list never changes. The moment you insert, remove, or reorder items, positions
shift and React reuses the wrong instances.

## 3. Demonstration: the selectable list bug

Imagine a list where users can select an item.

```jsx
{
  items.map((item, index) => (
    <ListItem
      key={index}
      item={item}
      isSelected={selectedId === item.id}
      onSelect={() => setSelectedId(item.id)}
    />
  ));
}
```

Now:

1. Select the second item.
2. Insert a new item at the top.

The selected UI appears on the wrong row.

Why?

- React reused component instances by index.
- State and DOM were preserved for the wrong item.

This is not a React bug. It is a broken identity contract.

## 4. The correct mental model

```jsx
{
  items.map((item) => <ListItem key={item.id} item={item} />);
}
```

Stable keys let React match items correctly across renders, move components
instead of reusing the wrong ones, and preserve the right state on the right
item.

## 5. When index keys are actually safe

Index keys are usually safe **only if** all of these are true:

- The list never changes.
- Items are never inserted or removed.
- Items have no local state or uncontrolled inputs.

In real applications, those conditions rarely hold.

## 6. Another powerful use of keys: reset a component

Keys do not only preserve identity. They can also **reset** it.

```jsx
function Page({ userId }) {
  return <ProfileForm key={userId} userId={userId} />;
}
```

When `userId` changes:

- The old form unmounts.
- State resets.
- Effects clean up.
- A new instance mounts.

No manual resets. No syncing state to props.

## 7. Key vs. useEffect reset

Instead of this:

```jsx
useEffect(() => {
  resetForm();
}, [userId]);
```

A key is better when:

- You want a full reset.
- Component state is tied to identity.
- You want predictable lifecycle behavior.

Use `useEffect` only when you need partial or conditional resets.

## Takeaways

- Keys define component identity.
- Index keys break identity when lists change.
- Bugs show up as misplaced state, focus, or selection.
- Stable keys improve correctness and performance.
- Keys can be used intentionally to reset components.

If state ever appears to "move" between list items, check your keys first.
