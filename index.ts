import { fromLong, getRandomInt, measurement, toLong } from "./helpers";
import { SortedPayloadedList } from "./sorted-list";

const list = new SortedPayloadedList<number, { count: number }>("count");

/**
 * Add request ip to the list with additional information
 * @param ip string
 */
function request_handled(ip: string) {
  list.add(toLong(ip), (data) => ({
    count: data ? data.count + 1 : 1,
  }));
}

function top100() {
  return list.slice(0, 99);
}

function clear() {
  list.clear();
}

Array(1000000)
  .fill(1)
  .forEach(() => request_handled(`192.168.0.${getRandomInt(0, 400)}`));

const measure = measurement(top100);

measure();
clear();
