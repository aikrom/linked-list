import { List } from './list';

export class Item {
  public list: List | null = null;
  public next: Item | null = null;
  public prev: Item | null = null;

  prepend(item: Item) {
    const list = this.list;

    if (!item || !item.append || !item.prepend || !item.detach) {
      throw new Error(
        'An argument without append, prepend, or detach methods was given to `Item#prepend`.'
      );
    }

    if (!list) {
      return false;
    }

    item.detach();

    if (this.prev) {
      item.prev = this.prev;
      this.prev.next = item;
    }

    item.next = this;
    item.list = list;
    this.prev = item;

    if (this === list.head) {
      list.head = item;
    }

    if (!list.tail) {
      list.tail = this;
    }

    list.size++;

    return item;
  }

  append(item: Item) {
    const list = this.list;

    if (!item || !item.append || !item.prepend || !item.detach) {
      throw new Error(
        'An argument without append, prepend, or detach methods was given to `Item#append`.'
      );
    }

    if (!list) {
      return false;
    }

    item.detach();

    if (this.next) {
      item.next = this.next;
      this.next.prev = item;
    }

    item.prev = this;
    item.list = list;
    this.next = item;

    if (this === list.tail || !list.tail) {
      list.tail = item;
    }

    list.size++;

    return item;
  }

  detach() {
    const list = this.list;

    if (!list) {
      return this;
    }

    if (list.tail === this) {
      list.tail = this.prev;
    }

    if (list.head === this) {
      list.head = this.next;
    }

    if (list.tail === list.head) {
      list.tail = null;
    }

    if (this.prev) {
      this.prev.next = this.next;
    }

    if (this.next) {
      this.next.prev = this.prev;
    }

    this.prev = this.next = this.list = null;
    list.size--;

    return this;
  }
}
