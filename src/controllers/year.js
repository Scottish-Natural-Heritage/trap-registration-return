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

const yearController = async (request) => {
  request.session.invalidYearError = false;
  request.session.noYearError = false;
  request.session.yearInFutureError = false;
  request.session.yearError = false;
  const today = new Date();
  const {year} = request.body;
  // If we have no value for `year` this is an error.
  if (!year) {
    request.session.noYearError = true;
    request.session.yearError = true;
    return ReturnState.Error;
  }

  // If `year` is not a number this is an error.
  if (!cleanInt(year)) {
    request.session.invalidYearError = true;
    request.session.yearError = true;
    return ReturnState.Error;
  }

  // If the year is in the future this is an error.
  if (cleanInt(year) > today.getFullYear()) {
    request.session.yearInFutureError = true;
    request.session.yearError = true;
    return ReturnState.Error;
  }

  // If the value is not a number after 1900 this is an error.
  if (cleanInt(year) < 1900) {
    request.session.invalidYearError = true;
    request.session.yearError = true;
    return ReturnState.Error;
  }

  // Unset any saved value.
  request.session.year = false;
  // The only way out of the year page is onwards, so return positive if no errors.
  return ReturnState.Positive;
};

export {yearController as default};
