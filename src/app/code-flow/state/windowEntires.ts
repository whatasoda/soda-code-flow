const windowEntries = Object.entries(Object.getOwnPropertyDescriptors(window))
  .filter(
    ([_, { enumerable, value }]) =>
      !enumerable &&
      typeof value !== 'undefined' &&
      typeof value !== 'number' &&
      typeof value !== 'string' &&
      typeof value !== 'boolean' &&
      value !== null,
  )
  .map(([name, { value }]) => ({ name, value }));

export const findWindowEntry = (value: unknown) => windowEntries.find(({ value: v }) => v === value);

export default windowEntries;
