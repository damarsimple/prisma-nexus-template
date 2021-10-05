export const nullToUndefined = <T>(e: T | null) => {
  if (e == null) return undefined;

  return e;
};
