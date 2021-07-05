import { Item } from './item';

export class Iterator<T extends Item = Item> {
  public value?: T | null = null;
  public done = false;
  public item?: T | null;

  constructor(item: T) {
    this.item = item;
  }

  next() {
    this.value = this.item;
    this.done = !this.item;
    this.item = this.item ? (this.item.next as T) : undefined;
    return this;
  }
}
