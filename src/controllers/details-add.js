import {ReturnState} from './_base.js';

const detailsAddController = (request) => {
  // The details add page is where the user will enter the details of the non target species
  // they trapped.
  request.session.detailsList = {};

  // The only way out of this page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {detailsAddController as default};
