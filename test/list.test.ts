import { Item, List } from '../src';

describe('List [List]', () => {
  describe('constructor [List#constructor]', () => {
    it('should have a static `of` method', () => {
      expect(typeof List.of).toBe('function');
    });
    it('should have a static `from` method', () => {
      expect(typeof List.from).toBe('function');
    });
  });
  describe('of [static List.of]', () => {
    it('should return an instance of self when *no* arguments are given', () => {
      expect(List.of() instanceof List).toBeTruthy();
    });
    it('should be empty', () => {
      expect(List.of().size).toBe(0);
    });
    it('should ignore `null` values', () => {
      //@ts-ignore
      expect(List.of(null).size).toBe(0);
    });
    it('should ignore `undefined` values', () => {
      //@ts-ignore
      expect(List.of(undefined).size).toBe(0);
    });
    it('should return an instance of self when arguments are given (1)', () => {
      expect(List.of(new Item()) instanceof List).toBeTruthy();
    });
    it('should have a proper size', () => {
      expect(List.of(new Item()).size).toBe(1);
    });
    it('should return an instance of self when arguments are given (2)', () => {
      class C extends List<any> {}
      expect(C.of(new Item()) instanceof C).toBeTruthy();
    });
    it('should throw an error when an invalid item is given', () => {
      // @ts-ignore
      expect(() => List.of({})).toThrow(Error);
    });
    it('should add (“append”) items in the order they were given', () => {
      const item = new Item();
      const item1 = new Item();
      const item2 = new Item();
      const list = List.of(item, item1, item2);

      expect(list.size).toBe(3);
      expect(list.head).toEqual(item);
      expect(list.head?.next).toEqual(item1);
      expect(list.head?.next?.next).toEqual(item2);
      expect(list.tail).toEqual(item2);
      expect(list.tail?.prev).toEqual(item1);
      expect(list.tail?.prev?.prev).toEqual(item);
    });
  });
  describe('of [static List.of]', () => {
    it('should return an instance of self when *no* arguments are given', () => {
      //@ts-ignore
      expect(List.from() instanceof List).toBeTruthy();
    });
    it('should return an instance of self when *no* arguments are given', () => {
      class C extends List<any> {}
      //@ts-ignore
      expect(C.from() instanceof C).toBeTruthy();
    });
    it('should be empty', () => {
      //@ts-ignore
      expect(List.from().size).toBe(0);
    });
    it('should ignore `null` values', () => {
      //@ts-ignore
      expect(List.from([null]).size).toBe(0);
    });
    it('should ignore `undefined` values', () => {
      //@ts-ignore
      expect(List.from([undefined]).size).toBe(0);
    });
    it('should return an instance of self when arguments are given (1)', () => {
      expect(List.from([new Item()]) instanceof List).toBeTruthy();
    });
    it('should have a proper size', () => {
      expect(List.from([new Item()]).size).toBe(1);
    });
    it('should return an instance of self when arguments are given (2)', () => {
      class C extends List<any> {}
      expect(C.of(new Item()) instanceof C).toBeTruthy();
      expect(List.of(new Item()) instanceof List).toBeTruthy();
    });
    it('should throw an error when an invalid item is given', () => {
      // @ts-ignore
      expect(() => List.from([{}])).toThrow(Error);
    });
    it('should add (“append”) items in the order they were given', () => {
      const item = new Item();
      const item1 = new Item();
      const item2 = new Item();
      const list = List.from([item, item1, item2]);

      expect(list.size).toBe(3);
      expect(list.head).toEqual(item);
      expect(list.head?.next).toEqual(item1);
      expect(list.head?.next?.next).toEqual(item2);
      expect(list.tail).toEqual(item2);
      expect(list.tail?.prev).toEqual(item1);
      expect(list.tail?.prev?.prev).toEqual(item);
    });
    it('should add items from an array with `Symbol.iterator`', () => {
      const items = [new Item(), new Item(), new Item()];
      //@ts-ignore
      items[Symbol.iterator] = undefined;
      const list = List.from(items);

      expect(list.size).toBe(3);
      expect(list.head).toEqual(items[0]);
      expect(list.head?.next).toEqual(items[1]);
      expect(list.head?.next?.next).toEqual(items[2]);
      expect(list.tail).toEqual(items[2]);
      expect(list.tail?.prev).toEqual(items[1]);
      expect(list.tail?.prev?.prev).toEqual(items[0]);
    });
  });
  describe('instance [List@instance]', () => {
    it('should have a `head` property set to `null`', () => {
      expect(new List().head).toBeNull();
    });
    it('should have a `tail` property set to `null`', () => {
      expect(new List().tail).toBeNull();
    });
    it('should be empty', () => {
      expect(new List().size).toBe(0);
    });
    it('should have a `prepend` method', () => {
      expect(typeof new List().prepend).toBe('function');
    });
    it('should have a `append` method', () => {
      expect(typeof new List().append).toBe('function');
    });
    it('should have a `toArray` method', () => {
      expect(typeof new List().toArray).toBe('function');
    });
    describe('prepend [List@instance#prepend]', () => {
      it('should return false when no item is given', () => {
        //@ts-ignore
        expect(new List().prepend()).toBeFalsy();
      });
      it('should have 0 size of no item is given', () => {
        const list = new List<any>();
        //@ts-ignore
        list.prepend();
        expect(list.size).toBe(0);
      });
      it('should return the given item', () => {
        const list = new List<any>();
        const item = new Item();
        expect(list.prepend(item)).toEqual(item);
      });
      it('should throw an error when an invalid item is given', () => {
        const list = new List<any>();
        //@ts-ignore
        expect(() => list.prepend({})).toThrow(Error);
      });
      it('should have proper size after prepend', () => {
        const list = new List<any>();
        const item = new Item();
        list.prepend(item);
        expect(list.size).toBe(1);
      });
      it('should set `head` to the first prependee', () => {
        const list = new List<any>();
        const item = new Item();
        list.prepend(item);
        expect(list.head).toEqual(item);
      });
      it('shouldn’t set `tail` to the first prependee', () => {
        const list = new List<any>();
        const item = new Item();
        list.prepend(item);
        expect(list.tail).toBeNull();
      });
      it('should set `head` to further prependees (1)', () => {
        const list = new List<any>();
        const item = new Item();
        const item1 = new Item();
        list.prepend(item);
        list.prepend(item1);
        expect(list.head).toEqual(item1);
        expect(list.size).toBe(2);
      });
      it('should set `tail` to the first prependee (1)', () => {
        const list = new List<any>();
        const item = new Item();
        const item1 = new Item();
        list.prepend(item);
        list.prepend(item1);
        expect(list.tail).toEqual(item);
        expect(list.size).toBe(2);
      });
      it('should set `head` to further prependedees (2)', () => {
        const list = new List<any>();
        const item = new Item();
        const item1 = new Item();
        const item2 = new Item();
        list.prepend(item);
        list.prepend(item1);
        list.prepend(item2);
        expect(list.head).toEqual(item2);
        expect(list.size).toBe(3);
      });
      it('should set `tail` to the first prependee (2)', () => {
        const list = new List<any>();
        const item = new Item();
        const item1 = new Item();
        const item2 = new Item();
        list.prepend(item);
        list.prepend(item1);
        list.prepend(item2);
        expect(list.tail).toEqual(item);
        expect(list.size).toBe(3);
      });
      it('should update size after item moved to new list', () => {
        const list = new List<any>();
        const list2 = new List<any>();
        const item = new Item();
        list.prepend(item);
        expect(list.size).toBe(1);
        expect(list2.size).toBe(0);
        list2.prepend(item);
        expect(list.size).toBe(0);
        expect(list2.size).toBe(1);
      });
      it('should detach the previous parent list of a prependee', () => {
        const list = new List<any>();
        const list2 = new List<any>();
        const item = new Item();
        list.prepend(item);
        expect(list.head).toEqual(item);
        expect(list2.head).toBeNull();
        list2.prepend(item);
        expect(list.head).toBeNull();
        expect(list2.head).toEqual(item);
      });
    });
    describe('append [List@instance#append]', () => {
      it('should return false when no item is given', () => {
        //@ts-ignore
        expect(new List().append()).toBeFalsy();
      });
      it('should have 0 size of no item is given', () => {
        const list = new List<any>();
        //@ts-ignore
        list.append();
        expect(list.size).toBe(0);
      });
      it('should return the given item', () => {
        const list = new List<any>();
        const item = new Item();
        expect(list.append(item)).toEqual(item);
      });
      it('should throw an error when an invalid item is given', () => {
        const list = new List<any>();
        //@ts-ignore
        expect(() => list.append({})).toThrow(Error);
      });
      it('should have proper size after prepend', () => {
        const list = new List<any>();
        const item = new Item();
        list.append(item);
        expect(list.size).toBe(1);
      });
      it('should set `head` to the first appendee', () => {
        const list = new List<any>();
        const item = new Item();
        list.append(item);
        expect(list.head).toEqual(item);
      });
      it('shouldn’t set `tail` to the first appendee', () => {
        const list = new List<any>();
        const item = new Item();
        list.append(item);
        expect(list.tail).toBeNull();
      });
      it('should set `head` to the first appendee (1)', () => {
        const list = new List<any>();
        const item = new Item();
        const item1 = new Item();
        list.append(item);
        list.append(item1);
        expect(list.head).toEqual(item);
        expect(list.size).toBe(2);
      });
      it('should set `tail` to the further appendees (1)', () => {
        const list = new List<any>();
        const item = new Item();
        const item1 = new Item();
        list.append(item);
        list.append(item1);
        expect(list.tail).toEqual(item1);
        expect(list.size).toBe(2);
      });
      it('should set `head` to the first appendee (2)', () => {
        const list = new List<any>();
        const item = new Item();
        const item1 = new Item();
        const item2 = new Item();
        list.append(item);
        list.append(item1);
        list.append(item2);
        expect(list.head).toEqual(item);
        expect(list.size).toBe(3);
      });
      it('should set `tail` to the further appendees (2)', () => {
        const list = new List<any>();
        const item = new Item();
        const item1 = new Item();
        const item2 = new Item();
        list.append(item);
        list.append(item1);
        list.append(item2);
        expect(list.tail).toEqual(item2);
        expect(list.size).toBe(3);
      });
      it('should update size after item moved to new list', () => {
        const list = new List<any>();
        const list2 = new List<any>();
        const item = new Item();
        list.append(item);
        expect(list.size).toBe(1);
        expect(list2.size).toBe(0);
        list2.append(item);
        expect(list.size).toBe(0);
        expect(list2.size).toBe(1);
      });
      it('should detach the previous parent list of a appendee', () => {
        const list = new List<any>();
        const list2 = new List<any>();
        const item = new Item();
        list.append(item);
        expect(list.head).toEqual(item);
        expect(list2.head).toBeNull();
        list2.append(item);
        expect(list.head).toBeNull();
        expect(list2.head).toEqual(item);
      });
    });
    describe('toArray [List@instance#toArray', () => {
      it('should return an array', () => {
        expect(Array.isArray(new List<any>(new Item()).toArray())).toBeTruthy();
      });
      it('should return an array, even when the operated on list has no items', () => {
        expect(Array.isArray(new List().toArray())).toBeTruthy();
      });
      it('should return a sorted array', () => {
        const list = new List(new Item(), new Item(), new Item());
        const result = list.toArray();

        expect(result[0]).toEqual(list.head);
        expect(result[1]).toEqual(list.head?.next);
        expect(result[2]).toEqual(list.head?.next?.next);
      });
    });
    describe('iterator [List@instance#iterator]', () => {
      it('should return a sorted array', () => {
        const list = new List(new Item(), new Item(), new Item());
        //@ts-ignore
        const result = Array.from(list);

        expect(result[0]).toEqual(list.head);
        expect(result[1]).toEqual(list.head?.next);
        expect(result[2]).toEqual(list.head?.next?.next);
      });
    });
  });
});
