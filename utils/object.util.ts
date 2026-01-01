export const removeFields = <T extends object, K extends keyof T>(object: T, keys: K[]) => {
  const obj = { ...object };
  keys.forEach((key) => {
    delete obj[key];
  });
  return { ...obj } as Omit<T, K>;
};
