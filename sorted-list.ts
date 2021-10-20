import { exclude, indexFrom } from "./helpers";

export type Positioned<T> = T & { position: number };

export class SortedPayloadedList<T, P> {
  private data: Map<T, Positioned<P>> = new Map();
  private list: T[] = [];

  constructor(private sortBy: string) {}

  add(value: T, cb: (data: P | undefined) => P) {
    const payload = this.data.get(value);
    const position = payload?.position;
    const assignedData = cb(payload);
    const sortPayloadKey = (assignedData as any)[this.sortBy];
    const firstHigherIndex = indexFrom<any>(
      this.list,
      (v) => this.data[v] && this.data.get(v)[this.sortBy] > sortPayloadKey,
      position ? position : this.list.length - 1
    );

    const nextPosition = firstHigherIndex === -1 ? 0 : firstHigherIndex + 1;

    if (position !== undefined) {
      this.list.splice(position, 1);
    }

    this.list.splice(nextPosition, 0, value);

    this.data.set(value, {
      ...assignedData,
      position: nextPosition,
    });
  }

  slice(from: number, to: number): Map<T, P> {
    const listOfData = new Map();

    for (let i = from; i < to; i++) {
      const element = this.list[i];
      listOfData.set(element, this.data.get(element));
    }

    return listOfData;
  }

  size() {
    return this.list.length;
  }

  clear() {
    this.list = [];
    this.data = new Map();
  }
}
