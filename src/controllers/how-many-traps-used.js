import {ReturnState} from './_base.js';

const howManyTrapsUsedController = (_request) => {
  // The only way out of the how many traps used page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {howManyTrapsUsedController as default};
