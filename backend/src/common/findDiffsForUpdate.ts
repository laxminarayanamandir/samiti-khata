/* eslint-disable @typescript-eslint/no-unsafe-assignment */
type diffReturn<T> = {
  previous: Partial<T>;
  current: Partial<T>;
};

function findDiffsForUpdate<T extends object>(
  oldData: T,
  newData: T,
): diffReturn<T> {
  const previous: Partial<T> = {};
  const current: Partial<T> = {};

  Object.entries(newData).forEach(([key, newValue]) => {
    const validKey = key as keyof T;

    const oldValue = oldData[validKey];

    if (oldValue !== newValue) {
      previous[validKey] = oldValue;
      current[validKey] = newValue;
    }
  });

  return {
    previous,
    current,
  };
}

export default findDiffsForUpdate;
