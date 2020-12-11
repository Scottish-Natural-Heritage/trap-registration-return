import {ReturnState} from './_base.js';

const usageController = (request) => {
  // The usage page is where the user will state whether or not they have used
  // meat bait traps.
  request.session.usage = true;
  // The only way out of the usage page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {usageController as default};
