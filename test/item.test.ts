/* eslint-disable @typescript-eslint/no-unused-vars */
import { Item, List } from '../src';

describe('Item [List.Item]', () => {
  it('should have a `list` property set to `null`', () => {
    expect(new Item().list).toBeNull();
  });
  it('should have a `prev` property set to `null`', () => {
    expect(new Item().prev).toBeNull();
  });
  it('should have a `next` property set to `null`', () => {
    expect(new Item().next).toBeNull();
  });
  it('should have a `prepend` method', () => {
    expect(typeof new Item().prepend).toBe('function');
  });
  it('should have a `append` method', () => {
    expect(typeof new Item().append).toBe('function');
  });
  it('should have a `detach` method', () => {
    expect(typeof new Item().detach).toBe('function');
  });
  describe('prepend [Item@instance#prepend]', () => {
    it('should return false when the operated on instance is not attached', () => {
      const item = new Item();
      const item1 = new Item();
      expect(item.prepend(item1)).toBeFalsy();
    });
    it('should do nothing if `item` is detached', () => {
      const item = new Item();
      const other = new Item();
      expect(item.prev).toBeNull();
      expect(other.next).toBeNull();
    });
    it('should throw an error when an invalid item is given', () => {
      const item = new Item();
      //@ts-ignore
      expect(() => item.prepend({})).toThrow(Error);
      //@ts-ignore
      expect(() => item.prepend(undefined)).toThrow(Error);
      //@ts-ignore
      expect(() => item.prepend(null)).toThrow(Error);
    });
    it('should return the given item when the operated on instance is attached', () => {
      const item = new Item();
      const other = new Item();
      const list = new List();
      list.prepend(item);
      expect(item.prepend(other)).toEqual(other);
    });
    it('should update size after prepend on item', () => {
      const item = new Item();
      const other = new Item();
      const list = new List();
      list.prepend(item);
      list.prepend(other);
      expect(list.size).toBe(2);
    });
    describe('attach/detach between lists (1)', () => {
      const item = new Item();
      const other = new List(item);
      const list = new List(new Item());

      list.head?.prepend(item);

      it('should update size after prepend on item to a different list', () => {
        expect(other.size).toBe(0);
      });
      it('should detach the previous parent list of a given item', () => {
        expect(other.head).toBeNull();
      });
      it('should attach the given item to the operated on item’s list', () => {
        expect(item.list).toEqual(list);
      });
      it('should set the given item as the parent list’s `head` when the operated on item is the current `head`', () => {
        expect(list.head).toEqual(item);
      });

      // it('should set the operated on item as the parent list’s `tail` when the operated on item is the current `head`', () => {
      //   expect(list.tail).toEqual(list.head?.next);
      // });
      // it('should set the operated on item’s `prev` property to the given item', () => {
      //   expect(list.tail?.prev).toEqual(item);
      // });
      // it('should set the given item’s `next` property to the operated on item', () => {
      //   expect(list.head?.next).toEqual(list.tail);
      // });

      const item1 = list.tail;
      const item2 = new Item();
      item1?.prepend(item2);

      it('should not remove the tail', () => {
        expect(list.tail).toEqual(item1);
      });
      it('should set `next` on the prependee', () => {
        expect(item2.next).toEqual(item1);
      });
      it('should set `prev` on the context', () => {
        expect(item1?.prev).toEqual(item2);
      });
    });

    describe('attach/detach between lists (2)', () => {
      const item = new Item();
      //@ts-ignore
      const other = new List(item);
      const list = new List(new Item());

      list.head?.prepend(item);

      it('should set the operated on item as the parent list’s `tail` when the operated on item is the current `head`', () => {
        expect(list.tail).toEqual(list.head?.next);
      });
      it('should set the operated on item’s `prev` property to the given item', () => {
        expect(list.tail?.prev).toEqual(item);
      });
      it('should set the given item’s `next` property to the operated on item', () => {
        expect(list.head?.next).toEqual(list.tail);
      });
    });
  });
  describe('append [Item@instance#append]', () => {
    it('should return false when the operated on instance is not attached', () => {
      const item = new Item();
      const item1 = new Item();
      expect(item.append(item1)).toBeFalsy();
    });
    it('should do nothing if `item` is detached', () => {
      const item = new Item();
      const other = new Item();
      expect(item.prev).toBeNull();
      expect(other.next).toBeNull();
    });
    it('should throw an error when an invalid item is given', () => {
      const item = new Item();
      //@ts-ignore
      expect(() => item.append({})).toThrow(Error);
      //@ts-ignore
      expect(() => item.append(undefined)).toThrow(Error);
      //@ts-ignore
      expect(() => item.append(null)).toThrow(Error);
    });
    it('should return the given item when the operated on instance is attached', () => {
      const item = new Item();
      const other = new Item();
      const list = new List();
      list.append(item);
      expect(item.append(other)).toEqual(other);
    });
    it('should update size after prepend on item', () => {
      const item = new Item();
      const other = new Item();
      const list = new List();
      list.append(item);
      list.append(other);
      expect(list.size).toBe(2);
    });
    describe('attach/detach between lists (1)', () => {
      const item = new Item();
      const other = new List(item);
      const list = new List(new Item());

      list.head?.append(item);

      it('should update size after append on item to a different list', () => {
        expect(other.size).toBe(0);
      });
      it('should detach the previous parent list of a given item', () => {
        expect(other.head).toBeNull();
      });
      it('should attach the given item to the operated on item’s list', () => {
        expect(item.list).toEqual(list);
      });
      it('should set the given item as the parent list’s `head` when the operated on item is the current `head`', () => {
        expect(list.tail).toEqual(item);
      });

      const item1 = list.head;
      const item2 = new Item();
      item1?.append(item2);

      it('should not remove the tail', () => {
        expect(list.head).toEqual(item1);
      });
      it('should set `next` on the prependee', () => {
        expect(item1?.next).toEqual(item2);
      });
      it('should set `prev` on the context', () => {
        expect(item2?.prev).toEqual(item1);
      });
    });

    describe('attach/detach between lists (2)', () => {
      const item = new Item();
      //@ts-ignore
      const other = new List(item);
      const list = new List(new Item());

      list.head?.append(item);

      it('should keep the operated on item as the parent list’s `head` when the operated on item is the current `head`', () => {
        expect(list.tail?.prev).toEqual(list.head);
      });
    });
  });
  describe('detach [Item@instance#detach]', () => {
    const item = new Item();
    const list = new List();

    list.append(item);

    it('should return self', () => {
      expect(item.detach()).toEqual(item);
    });
    it('should update size after detached item', () => {
      expect(list.size).toBe(0);
    });
    it('should return self, even when the item is not attached', () => {
      expect(item.detach()).toEqual(item);
    });
    it('should not update size after detaching already detached item', () => {
      expect(list.size).toBe(0);
    });

    const item1 = new Item();
    const item2 = new Item();
    const list1 = new List();

    list1.append(item1);
    list1.append(item2);
    item1.detach();

    it('should update size after detached item', () => {
      expect(list1.size).toBe(1);
    });
    it('should set the item’s `next` property to the parent list’s `head` when the item is its current `head`', () => {
      expect(list1.head).toEqual(item2);
    });

    const list2 = new List();
    const item3 = new Item();
    const item4 = new Item();
    const item5 = new Item();

    list2.append(item3);
    list2.append(item4);
    list2.append(item5);
    item3.detach();

    it('should update size after detached item', () => {
      expect(list2.size).toBe(2);
    });
    it('should set the item’s `prev` property to the parent list’s `tail` when the item is its current `tail`', () => {
      expect(list2.tail).toEqual(item5);
    });

    const list3 = new List();
    const item6 = new Item();
    const item7 = new Item();

    list3.append(item6);
    list3.append(item7);
    item7.detach();

    it('should update size after detached item', () => {
      expect(list3.size).toBe(1);
    });
    it('should set the parent list’s `tail` to `null` when the item is its current `tail` and its `prev` property is the current `tail`', () => {
      expect(list3.tail).toBeNull();
    });

    const list4 = new List();
    const item8 = new Item();
    const item9 = new Item();
    const item10 = new Item();

    list4.append(item8);
    list4.append(item9);
    list4.append(item10);
    item9.detach();

    it('should update size after detached item', () => {
      expect(list4.size).toBe(2);
    });
    it('should set the previous item’s `next` property to the current item’s `next` property', () => {
      expect(item8.next).toEqual(item10);
    });
    it('should set the next item’s `prev` property to the current item’s `prev` property', () => {
      expect(item10.prev).toEqual(item8);
    });

    const item11 = new Item();
    const list5 = new List();

    list5.append(item11);
    item11.detach();

    it('should set the item’s `list` property to `null`', () => {
      expect(item11.list).toBeNull();
    });

    const item12 = new Item();
    const item13 = new Item();
    const list6 = new List();

    list6.append(item12);
    list6.append(item13);
    item13.detach();

    it('should set the item’s `prev` property to `null`', () => {
      expect(item12.prev).toBeNull();
    });

    const item14 = new Item();
    const item15 = new Item();
    const list7 = new List();

    list7.append(item14);
    list7.append(item15);
    item14.detach();

    it('should set the item’s `next` property to `null`', () => {
      expect(item14.next).toBeNull();
    });
  });
});
