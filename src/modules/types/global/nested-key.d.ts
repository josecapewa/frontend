type NestedKeyOf<T> = {
  [K in keyof T]: T[K] extends object
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`;
}[keyof T];
