import {ReturnState} from './_base.js';

const meatBaitInTrapsController = (_request) => {
  // The only way out of the meat bait in traps page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {meatBaitInTrapsController as default};
