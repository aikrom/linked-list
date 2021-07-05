import { EventEmitter } from '@aintts/event-emitter';
import { List } from './list';

export class Item {
  public list: List | null = null;
  public next: Item | null = null;
  public prev: Item | null = null;

  public event = new EventEmitter<{
    append: (item: Item | null) => void;
    prepend: (item: Item | null) => void;
    detach: (item: Item | null) => void;
    'change-prev': (item: Item | null) => void;
    'change-next': (item: Item | null) => void;
    'change-list': (list: List | null, item: Item) => void;
  }>([]);

  _dangerSetPrev(prev: Item | null) {
    this.prev = prev;
    this.event.emit('change-prev', this);
  }

  _dangerSetNext(next: Item | null) {
    this.next = next;
    this.event.emit('change-next', this);
  }

  _dangerSetList(list: List | null) {
    this.list = list;
    this.event.emit('change-list', this.list, this);
  }

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
      item._dangerSetPrev(this.prev);
      this.prev._dangerSetNext(item);
    }

    item._dangerSetNext(this);
    item._dangerSetList(list);
    this._dangerSetPrev(item);

    if (this === list.head) {
      list._dangerSetHead(item);
    }

    if (!list.tail) {
      list._dangerSetTail(this);
    }

    list._dangerSetSize(list.size + 1);

    this.event.emit('prepend', this);

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
      item._dangerSetNext(this.next);
      this.next._dangerSetPrev(item);
    }

    item._dangerSetPrev(this);
    item._dangerSetList(list);
    this._dangerSetNext(item);

    if (this === list.tail || !list.tail) {
      list._dangerSetTail(item);
    }

    list._dangerSetSize(list.size + 1);

    this.event.emit('append', this);

    return item;
  }

  detach() {
    const list = this.list;

    if (!list) {
      return this;
    }

    if (list.tail === this) {
      list._dangerSetTail(this.prev);
    }

    if (list.head === this) {
      list._dangerSetHead(this.next);
    }

    if (list.tail === list.head) {
      list._dangerSetTail(null);
    }

    if (this.prev) {
      this.prev.next = this.next;
    }

    if (this.next) {
      this.next._dangerSetPrev(this.prev);
    }

    this._dangerSetPrev(null);
    this._dangerSetNext(null);
    this._dangerSetList(null);
    list._dangerSetSize(list.size - 1);

    this.event.emit('detach', this);

    return this;
  }
}
