import {ReturnState} from './_base.js';

const usageController = (request) => {
  // The usage page is where the user will state whether or not they have used
  // meat bait traps.

  // Checks if user selected yes or no and sets return state approprietely
  if (request.body.usage === 'yes') {
    request.session.usageError = false;
    request.session.usage = true;
    return ReturnState.Positive;
  }

  if (request.body.usage === 'no') {
    request.session.usageError = false;
    request.session.usage = false;
    return ReturnState.Negative;
  }

  request.session.usageError = true;
  // The only way out of the usage page for now is onwards, so return success and continue
  // the form.

  request.session.usage = undefined;
  return ReturnState.Error;
};

export {usageController as default};
