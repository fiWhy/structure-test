import { binarySearch, exclude, indexFrom } from "./helpers";

export type Positioned<T> = T & { position: number };

export class SortedPayloadedList<T, P> {
  private data: Record<string, Positioned<P>> = {};
  private list: T[] = [];

  constructor(private sortBy: string) {}

  add(value: T, cb: (data: P | undefined) => P) {
    const payload: Positioned<P> | undefined = this.data[String(value)];
    const position = payload?.position;
    const assignedData = cb(payload);
    const sortPayloadKey = (assignedData as any)[this.sortBy];
    const firstHigherIndex = indexFrom<any>(
      this.list,
      (v) =>
        this.data[v] && (this.data[v] as any)[this.sortBy] > sortPayloadKey,
      position ? position : this.list.length - 1
    );

    const nextPosition = firstHigherIndex === -1 ? 0 : firstHigherIndex + 1;

    if (position !== undefined) {
      this.list.splice(position, 1);
    }

    this.list.splice(nextPosition, 0, value);

    this.data[String(value)] = {
      ...assignedData,
      position: nextPosition,
    };
  }

  slice(from: number, to: number): [T, P][] {
    return this.list
      .slice(from, to)
      .map((v) => [v, exclude(this.data[String(v)], "position")]);
  }

  size() {
    return this.list.length;
  }

  clear() {
    this.list = [];
    this.data = {};
  }
}
