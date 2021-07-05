import { Item } from './item';
import { Iterator } from './iterator';

export class List<T extends Item = Item> {
  public head: T | null = null;
  public tail: T | null = null;
  public size = 0;

  static of<R extends Item = Item>(...items: R[]) {
    return appendAll<R>(new this(), items);
  }

  static from<R extends Item = Item>(items: R[]) {
    return appendAll<R>(new this(), items);
  }

  constructor(...items: T[]) {
    appendAll<T>(this, items);
  }

  toArray() {
    let item = this.head;
    const result = [];

    while (item) {
      result.push(item);
      item = item.next as T;
    }

    return result;
  }

  prepend(item: Item) {
    if (!item) {
      return false;
    }

    if (!item.append || !item.prepend || !item.detach) {
      throw new Error(
        'An argument without append, prepend, or detach methods was given to `List#prepend`.'
      );
    }

    if (this.head) {
      return this.head.prepend(item);
    }

    item.detach();
    item.list = this;
    this.head = item as T;
    this.size++;

    return item;
  }

  append(item: T) {
    if (!item) {
      return false;
    }

    if (!item.append || !item.prepend || !item.detach) {
      throw new Error(
        'An argument without append, prepend, or detach methods was given to `List#append`.'
      );
    }

    if (this.tail) {
      return this.tail.append(item);
    }

    if (this.head) {
      return this.head.append(item);
    }

    item.detach();
    item.list = this;
    this.head = item;
    this.size++;

    return item;
  }

  [Symbol.iterator]() {
    return new Iterator<T>(this.head as T);
  }
}

function appendAll<T extends Item = Item>(list: List<T>, items: T[]) {
  let index, item, iterator;

  if (!items) {
    return list;
  }

  if (items[Symbol.iterator]) {
    iterator = items[Symbol.iterator]();
    item = {};

    while (!item.done) {
      item = iterator.next();
      list.append(item && item.value);
    }
  } else {
    index = -1;

    while (++index < items.length) {
      list.append(items[index]);
    }
  }

  return list;
}
