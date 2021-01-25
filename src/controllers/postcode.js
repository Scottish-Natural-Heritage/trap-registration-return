import {ReturnState} from './_base.js';

const cleanInput = (body) => {
  return {
    postcode: body.postcode === undefined ? undefined : body.postcode.trim()
  };
};

const postcodeController = (request) => {
  // The postcode page is where the user will enter their postcode
  const cleanForm = cleanInput(request.body);
  request.session.postcode = cleanForm.postcode;

  // Clear error state
  request.session.postcodeError = false;

  // Input validation of postcode ensures between 5 and 7 characters
  if (
    request.session.postcode === undefined ||
    request.session.postcode.trim() === '' ||
    request.session.postcode.trim().length < 5
  ) {
    request.session.postcodeError = true;
  }

  // Set error state
  if (request.session.postcodeError) {
    return ReturnState.Error;
  }

  // The only way out of the usage page for now is onwards, so return success and continue
  // the form
  return ReturnState.Positive;
};

export {postcodeController as default};
