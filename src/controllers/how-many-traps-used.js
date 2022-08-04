import {ReturnState} from './_base.js';

/**
 * Check to see if the user supplied string looks like a number.
 *
 * @param {string} number A number.
 * @returns {boolean} True if this looks like a valid number,
 * otherwise false.
 */
const validNumber = (number) => {
  if (number === undefined) {
    return false;
  }

  if (number.trim() === '') {
    return false;
  }

  const testParse = Number.parseInt(number, 10);
  if (Number.isNaN(testParse)) {
    return false;
  }

  if (testParse < 0) {
    return false;
  }

  return true;
};

const howManyTrapsUsedController = (request) => {
  // Clear all errors.
  request.session.noLarsenError = false;
  request.session.noLarsenMateError = false;
  request.session.noLarsenPodError = false;

  // If the value is not a valid number then create an error.
  if (!validNumber(request.body.numberLarsenMateCaught)) {
    request.session.noLarsenMateError = true;
  }

  // If the value is not a valid number then create an error.
  if (!validNumber(request.body.numberLarsenPodCaught)) {
    request.session.noLarsenPodError = true;
  }

  // Set errors under generic error.
  request.session.noLarsenError = request.session.noLarsenMateError || request.session.noLarsenPodError;

  // If we've seen an error in any of the fields, our visitor needs to go back
  // and fix them.
  if (request.session.noLarsenError) {
    return ReturnState.Error;
  }

  // Set in values into session.
  request.session.numberLarsenMateCaught = request.body.numberLarsenMateCaught;
  request.session.numberLarsenPodCaught = request.body.numberLarsenPodCaught;

  // The request passed all our validation, we've stored copies of everything we
  // need, so it's time to go on.
  return ReturnState.Positive;
};

export {howManyTrapsUsedController as default};
