export function arrayDifference<A, B extends A>(array1: A[], array2: B[]): A[] {
  return array2.filter((x) => !array1.includes(x));
}

export function arrayMerge<A, B extends A>(array1: A[], array2: B[]): A[] {
  return [...new Set([...array1, ...array2])];
}
