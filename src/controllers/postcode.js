import {ReturnState} from './_base.js';

const postcodeController = (request) => {
  // The postcode page is where the user will enter their postcode.
  request.session.postcode = 'IV3 8NW';

  // The only way out of the usage page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {postcodeController as default};
