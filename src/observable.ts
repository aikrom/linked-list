import { Item } from './item';
import { List } from './list';

type TConstructor<T = {}> = new (...args: any[]) => T;
type IObserver<T = any, R extends string = string> = (
  subject: TConstructor<IObservable<T, R>>,
  reason: R
) => void;

interface IObservable<T = any, R extends string = string> {
  listen(observer: IObserver<T, R>): number;
  unlisten(observer: IObserver<T, R>): number;
  notify(reason: R): void;
}

export function Observable<
  T = any,
  C extends string = string,
  R extends TConstructor = TConstructor<T>
>(Base: R): TConstructor<IObservable<T, C>> & R {
  return class extends Base {
    public _observers: IObserver<T, C>[] = [];
    public listen(observer: IObserver<T, C>) {
      return !this._observers.includes(observer)
        ? this._observers.length
        : this._observers.push(observer);
    }
    public unlisten(observer: IObserver<T, C>) {
      const observerIndex = this._observers.indexOf(observer);
      return observerIndex === -1
        ? this._observers.length
        : this._observers.splice(observerIndex, 1).length;
    }
    public notify(reason: C) {
      this._observers.forEach(observer =>
        observer((this as any) as TConstructor<IObservable<T, C>> & R, reason)
      );
    }
  };
}

class ObservableList extends Observable<List, 'append' | 'prepend'>(List) {
  public append(item: Item) {
    const result = super.append(item);
    this.notify('append');
    return result;
  }
  public prepend(item: Item) {
    const result = super.prepend(item);
    this.notify('prepend');
    return result;
  }
}

const list = new ObservableList(1);

list.listen((subject, reason) => console.log(subject, reason));
