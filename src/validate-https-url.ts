"use strict";

/**
 * @param {string} str
 * @param {boolean=} opt_allowHttp
 * @return {boolean}
 */
export const validateHttpsUrl = (
  str: string,
  opt_allowHttp: boolean = false
): boolean => {
  return opt_allowHttp ? /^https?:/.test(str) : /^https:/.test(str);
};
