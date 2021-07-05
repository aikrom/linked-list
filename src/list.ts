import { EventEmitter } from '@aintts/event-emitter';
import { Item } from './item';
import { Iterator } from './iterator';

export class List<T extends Item = Item> {
  public head: T | null = null;
  public tail: T | null = null;
  public size = 0;

  public event = new EventEmitter<{
    'change-head': (list: List<T>) => void;
    'change-tail': (list: List<T>) => void;
    'change-size': (size: number, list: List<T>) => void;
    append: (item: T | null, tail: T | null, list: List<T>) => void;
    prepend: (item: T | null, head: T | null, list: List<T>) => void;
  }>(['change-head', 'change-tail', 'change-size', 'append', 'prepend']);

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

  _dangerSetHead(head: T | null) {
    this.head = head;
    this.event.emit('change-head', this);
  }

  _dangerSetTail(tail: T | null) {
    this.tail = tail;
    this.event.emit('change-tail', this);
  }

  _dangerSetSize(size: number) {
    this.size = size;
    this.event.emit('change-size', this.size, this);
  }

  prepend(item: T) {
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
    item._dangerSetList(this);
    this._dangerSetHead(item);
    this._dangerSetSize(this.size + 1);

    this.event.emit('prepend', item, this.head, this);

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
    item._dangerSetList(this);
    this._dangerSetHead(item);
    this._dangerSetSize(this.size + 1);

    this.event.emit('append', item, this.tail, this);

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
