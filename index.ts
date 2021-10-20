import { fromLong, getRandomInt, toLong } from "./helpers";
import { SortedPayloadedList } from "./sorted-list";

const list = new SortedPayloadedList<number, { count: number }>("count");

function request_handled(ip: string) {
  list.add(toLong(ip), (data) => ({
    count: data ? data.count + 1 : 1,
  }));
}

function top100() {
  return list.slice(0, 99).map(([v, data]) => [fromLong(v), data]);
}

function clear() {
  list.clear();
}

Array(1000000)
  .fill(1)
  .forEach(() => request_handled(`192.168.0.${getRandomInt(0, 400)}`));

console.log(list.slice(0, 100));
