import {ReturnState} from './_base.js';

/**
 * Cleans and sanitises a string form field.
 *
 * @param {string | undefined} dirty A user-entered string from an
 * incoming form.
 * @returns {string | undefined} A trimmed string, or undefined.
 */
const cleanInputString = (dirty) => {
  if (dirty !== undefined && typeof dirty === 'string' && dirty.trim() !== '') {
    return dirty.trim();
  }

  return undefined;
};

/**
 * Process a string in to either it's integer `number` representation or return
 * `undefined`.
 *
 * @param {string | undefined} dirtyValue The user's supplied integer value.
 * @returns {number | undefined} The cleaned integer value.
 */
const cleanInt = (dirtyValue) => {
  const trimmedValue = cleanInputString(dirtyValue);
  if (trimmedValue === undefined) {
    return undefined;
  }

  // Check we're only receiving digits, not text, negative numbers or floats.
  if (!/^\d+$/.test(trimmedValue)) {
    return undefined;
  }

  // Check it does actually parse correctly.
  const valueAsNumber = Number.parseInt(trimmedValue, 10);
  if (Number.isNaN(valueAsNumber)) {
    return undefined;
  }

  // Return the fully validated integer value.
  return valueAsNumber.valueOf();
};

/**
 * Clean a user supplied 'year' in to either a `number` or `undefined`.
 *
 * @param {string | undefined} dirtyYear The user's supplied year value.
 * @returns {number | undefined} The cleaned year value.
 */
const cleanYear = (dirtyYear) => {
  const yearAsNumber = cleanInt(dirtyYear);

  if (yearAsNumber === undefined) {
    return undefined;
  }

  if (yearAsNumber < 1900) {
    return undefined;
  }

  return yearAsNumber;
};

const yearController = async (request) => {
  request.session.invalidYearError = false;
  request.session.noYearError = false;
  request.session.yearInFutureError = false;
  const today = new Date();
  const year = cleanYear(request.body.year);

  if (cleanInputString(year) === undefined) {
    request.session.noYearError = true;
    request.session.yearError = true;
    return ReturnState.Error;
  }

  if (year > today.getFullYear()) {
    request.session.yearInFutureError = true;
    request.session.yearError = true;
    return ReturnState.Error;
  }

  if (year === undefined) {
    request.session.invalidYearError = true;
    request.session.yearError = true;
    return ReturnState.Error;
  }

  request.session.year = request.body.year;
  // The only way out of the year page is onwards, so return positive if no errors
  return ReturnState.Positive;
};

export {yearController as default};
