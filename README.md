# @aintts/linked-list

Small double [linked list][wiki] (inspired by [linked-list][main]).

## Install

[npm][]:

```sh
npm install @aintts/linked-list
```

## Use

```ts
import {List, Item} from '@aintts/linked-list'

const item1 = new Item()
const item2 = new Item()
const item3 = new Item()
const list = new List<Item>(item1, item2, item3)

list.head // => item1
list.head.next // => item2
list.head.next.next // => item3
list.head.next.prev // => item1
list.tail // => item3
list.tail.next // => `null`
```

Subclassing:

```ts
import {List, Item} from '@aintts/linked-list'

class Tokens<T extends Token> extends List<T> {
  join(delimiter: string) {
    return this.toArray().join(delimiter)
  }
}

class Token<T> extends Item {
  public value: T

  constructor(value: T) {
    super()
    this.value = value
  }

  toString() {
    return this.value
  }
}

const dogs = new Token('dogs')
const and = new Token('&')
const cats = new Token('cats')
const tokens = new Tokens<Token<string>>(dogs, and, cats)

console.log(tokens.join(' ')) // => 'dogs & cats'

and.prepend(cats)
and.append(dogs)

console.log(tokens.join(' ') + '!') // => 'cats & dogs!'
```

## Note

> Do not modify the property of an item or list directly. This disrupts the work of 
> the event-emitter. If you want to change a property directly, you can use `_dangerSet[PROPERTY]`, 
> which will fire a single event instead of chaining events.

## API

This package exports the following identifiers: `List`, `Item`.
There is no default export.

### `List([items…])`

```ts
new List()
new List(new Item(), new Item())
```

Create a new linked list.

#### `List.from([items])`

```ts
List.from()
List.from([])
List.from([new Item(), new Item()])
```

Create a new `this` and adds the given array of items.
Ignores `null` or `undefined` values.
Throws an error when a given item has no `detach`, `append`, or `prepend`
methods.

#### `List.of([items…])`

```ts
List.of()
List.of(new Item(), new Item())
```

Creates a new linked list from the given arguments.
Defers to `List.from`.

#### `List#append(item)`

```ts
const list = new List()
const item = new Item()

list.head === null // => true
item.list === null // => true

list.append(item)

list.head === item // => true
item.list === list // => true
```

Appends an item to a list.
Throws an error when the given item has no `detach`, `append`, or `prepend`
methods.
Returns the given item.

#### `List#prepend(item)`

```ts
const list = new List()
const item = new Item()

list.prepend(item)
```

Prepends an item to a list.
Throws an error when the given item has no `detach`, `append`, or `prepend`
methods.
Returns the given item.

#### `List#toArray()`

```ts
const item1 = new Item()
const item2 = new Item()
const list = new List(item1, item2)
const array = list.toArray()

array[0] === item1 // => true
array[1] === item2 // => true
array[0].next === item2 // => true
array[1].prev === item1 // => true
```

Returns the items in the list in an array.

#### `List#head`

```ts
const item = new Item()
const list = new List(item)

list.head === item // => true
```

The first item in a list, and `null` otherwise.

#### `List#tail`

```ts
const list = new List()
const item1 = new Item()
const item2 = new Item()

list.tail === null // => true

list.append(item1)
list.tail === null // => true, see note.

list.append(item2)
list.tail === item2 // => true
```

The last item in a list, and `null` otherwise.
Note that a list with only one item has **no tail**, only a head.

#### `List#size`

```ts
const list = new List()
const item1 = new Item()
const item2 = new Item()

list.size === 0 // => true

list.append(item1)
list.size === 1 // => true

list.append(item2)
list.size === 2 // => true
```

The number of items in the list.

### `Item()`

```ts
const item = new Item()
```

Creates a new linked list Item.

#### `Item#append(item)`

```ts
const item1 = new Item()
const item2 = new Item()

new List().append(item1)

item1.next === null // => true

item1.append(item2)
item1.next === item2 // => true
```

Adds the given item **after** the operated on item in a list.
Throws an error when the given item has no `detach`, `append`, or `prepend`
methods.
Returns false when the operated on item is not attached to a list, otherwise the
given item.

#### `Item#prepend(item)`

```ts
const item1 = new Item()
const item2 = new Item()

new List().append(item1)

item1.prev === null // => true

item1.prepend(item2)
item1.prev === item2 // => true
```

Adds the given item **before** the operated on item in a list.
Throws an error when the given item has no `detach`, `append`, or `prepend`
methods.
Returns false when the operated on item is not attached to a list, otherwise
the given item.

#### `Item#detach()`

```ts
const item = new Item()
const list = new List(item)

item.list === list // => true

item.detach()
item.list === null // => true
```

Removes the operated on item from its parent list.
Removes references to it on its parent `list`, and `prev` and `next` items;
relinking them when possible.
Returns the operated on item.
Even when it was already detached.

#### `Item#next`

```ts
const item1 = new Item()
const item2 = new Item()

new List(item1)

item1.next === null // => true
item2.next === null // => true

item1.append(item2)

item1.next === item2 // => true

item1.detach()

item1.next === null // => true
```

The items succeeding item, and `null` otherwise.

#### `Item#prev`

```ts
const item1 = new Item()
const item2 = new Item()

new List(item)

item1.prev === null // => true
item2.prev === null // => true

item1.append(item2)

item1.prev === item1 // => true

item2.detach()

item2.prev === null // => true
```

The items preceding item, and `null` otherwise.

#### `Item#list`

```ts
const item = new Item()
const list = new List()

item.list === null // => true

list.append(item)

item.list === list // => true

item.detach()

item.list === null // => true
```

The items parent list, and `null` otherwise.

## License

[MIT][license] © Ikrom Alizoda

<!-- Definitions -->

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[wiki]: https://wikipedia.org/wiki/Linked_list

[main]: https://github.com/wooorm/linked-list