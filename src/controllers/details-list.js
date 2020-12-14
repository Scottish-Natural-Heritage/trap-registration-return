import {ReturnState} from './_base.js';

const detailsListController = (request) => {
  // The details page is where the user will view the details of the non target species
  // they trapped.

  if (request.body.add) {
    return ReturnState.Secondary;
  }

  if (request.body.edit) {
    return ReturnState.Tertiary;
  }

  request.session.detailsList = {};

  // The only way out of this page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {detailsListController as default};
