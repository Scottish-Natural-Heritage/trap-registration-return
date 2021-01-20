import {ReturnState} from './_base.js';

const validTrapType = (trapType) => {
  if (trapType === undefined) {
    return false;
  }

  if (trapType.trim() === '') {
    return false;
  }

  return true;
};

const validSpecies = (species) => {
  if (species === undefined) {
    return false;
  }

  if (species.trim() === '') {
    return false;
  }

  return true;
};

/**
 * Clean a string to remove any non-grid-ref characters.
 *
 * Takes something like '-NH_6400 4800__' and returns 'NH64004800'.
 *
 * @param {string} gridRef A user supplied grid ref of dubious quality.
 * @returns {string} A nice tidy version of the grid ref.
 */
const formatGridReference = (gridRef) => {
  return gridRef.toUpperCase().replace(/[^A-Z\d]/g, '');
};

/**
 * Check to see if the user supplied string looks like a grid ref.
 *
 * We first tidy up the user input, so that it's close to being a grid ref,
 * then we check that what we have left is actually a grid ref.
 *
 * @param {string} gridRef A candidate grid ref.
 * @returns {boolean} True if this looks like a valid grid ref, otherwise false.
 */
const validGridReference = (gridRef) => {
  // Check to make sure we've got some input before we go any further.
  if (gridRef === undefined) {
    return false;
  }

  // Tidy up the grid ref so that it's likely to pass validation.
  const formattedGridRef = formatGridReference(gridRef);

  // Later, we'll check that it's in the AA00000000 style, but we'll only be
  // checking for 8 or more digits, not an even number of digits, so we need
  // this one extra check.
  if (formattedGridRef.length % 2 !== 0) {
    return false;
  }

  // Check that the gridRef is in the AA00000000 format, and fail them if
  // it's not.
  return /^[A-Z]{2}\d{8,10}$/g.test(formattedGridRef);
};

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

  return true;
};

const detailsController = (request) => {
  request.session.currentGridReferenceError = !validGridReference(request.body.currentGridReference);
  request.session.currentSpeciesCaughtError = !validSpecies(request.body.currentSpeciesCaught);
  request.session.currentNumberCaughtError = !validNumber(request.body.currentNumberCaught);
  request.session.currentTrapTypeError = !validTrapType(request.body.currentTrapType);

  request.session.detailsError =
    request.session.currentGridReferenceError ||
    request.session.currentSpeciesCaughtError ||
    request.session.currentNumberCaughtError ||
    request.session.currentTrapTypeError;

  if (request.session.detailsError) {
    // Don't return the 'formatted' one here, just send back the original one. It's too confusing otherwise.
    request.session.currentGridReference = request.body.currentGridReference.trim();
    request.session.currentSpeciesCaught = request.body.currentSpeciesCaught;
    request.session.currentNumberCaught = request.body.currentNumberCaught;
    request.session.currentTrapType = request.body.currentTrapType;
    request.session.currentComment = request.body.currentComment;

    return ReturnState.Error;
  }

  if (request.session.currentIndex === -1) {
    const newDetail = {
      gridReference: formatGridReference(request.body.currentGridReference),
      speciesCaught: request.body.currentSpeciesCaught,
      numberCaught: Number.parseInt(request.body.currentNumberCaught, 10),
      trapType: request.body.currentTrapType,
      comment: request.body.currentComment
    };

    if (!Array.isArray(request.session.detailsList)) {
      request.session.detailsList = [];
    }

    request.session.detailsList.push(newDetail);
  } else {
    request.session.detailsList[request.session.currentIndex].gridReference = formatGridReference(
      request.body.currentGridReference
    );
    request.session.detailsList[request.session.currentIndex].speciesCaught = request.body.currentSpeciesCaught;
    request.session.detailsList[request.session.currentIndex].numberCaught = Number.parseInt(
      request.body.currentNumberCaught,
      10
    );
    request.session.detailsList[request.session.currentIndex].trapType = request.body.currentTrapType;
    request.session.detailsList[request.session.currentIndex].comment = request.body.currentComment;
  }

  request.session.detailsError = false;
  request.session.detailsListCountError = false;
  return ReturnState.Positive;
};

export {detailsController as default};
