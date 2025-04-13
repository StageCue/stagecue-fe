/* eslint-disable @typescript-eslint/no-explicit-any */

export const queryParams = <T extends Record<string, any>>(data: T): string =>
  Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(',')}`;
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join('&');
