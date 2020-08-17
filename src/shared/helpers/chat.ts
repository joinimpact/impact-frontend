export function makePartialFilledArray<T>(chunk: T[], offset: number, prevArray: T[], totalSize: number): T[] {
  let out: T[] = prevArray;
  if (!prevArray || prevArray.length === 0) {
    out = new Array<T>(totalSize);
  } else if (prevArray.length !== totalSize) {
    out = new Array<T>(totalSize);
    for (let i = 0; i < prevArray.length; i++) {
      out[i] = prevArray[i];
    }
  }

  for (let i = 0; i < chunk.length; i++) {
    out[offset + i] = chunk[i];
  }

  return out;
}

export function calcPageNumberByReverseIndex(index: number, total: number, pageSize: number) {
  const normalOffset = total - index;
  return Math.floor(normalOffset / pageSize);
}
