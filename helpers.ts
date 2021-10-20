export const toLong = (ip: string) => {
  var ipl = 0;
  ip.split(".").forEach(function (octet) {
    ipl <<= 8;
    ipl += parseInt(octet);
  });
  return ipl >>> 0;
};

export const fromLong = (ipl: number): string =>
  (ipl >>> 24) +
  "." +
  ((ipl >> 16) & 255) +
  "." +
  ((ipl >> 8) & 255) +
  "." +
  (ipl & 255);

export const indexFrom = <T>(
  arr: T[],
  comp: (v: T, index: number) => boolean,
  startFrom?: number
) => {
  for (let i = startFrom || arr.length - 1; i >= 0; i--) {
    const element = arr[i];
    if (comp(element, i)) return i;
  }
  return -1;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const exclude = (obj: any, key: string) => {
  const { [key]: _, ...other } = obj;
  return other;
};

export const measurement =
  (cb: any) =>
  (...args: any[]) => {
    console.time("performance");
    const result = cb(...args);
    console.timeEnd("performance");
    return result;
  };
