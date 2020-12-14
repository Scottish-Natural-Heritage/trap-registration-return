import {ReturnState} from './_base.js';

const detailsEditController = (request) => {
  // The edit details page is where the user will edit the details of the non target species
  // they trapped.
  request.session.detailsList = {};

  // The only way out of this page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {detailsEditController as default};
