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

  if (testParse <= 0) {
    return false;
  }

  return true;
};

const howManyTrapsUsedController = (request) => {

  request.session.noLarsenMateError = false;
  request.session.noLarsenPodError = false;

  // Did the user add an amount for larsen mate.
  if (!validNumber(request.body.numberLarsenMateCaught)) {
    // Check it's a valid number then save the number into session.
    request.session.noLarsenMateError = true;
  }

  if (!validNumber(request.body.numberLarsenPodCaught)) {
    // Check it's a valid number then save the number into session.
    request.session.noLarsenPodError = true;
  }

  if (request.session.noLarsenMateError || request.session.noLarsenPodError) {
    return ReturnState.Error;
  }

  request.session.numberLarsenMateCaught = request.body.numberLarsenMateCaught;
  request.session.numberLarsenPodCaught = request.body.numberLarsenPodCaught;

  return ReturnState.Positive;
};

export {howManyTrapsUsedController as default};
