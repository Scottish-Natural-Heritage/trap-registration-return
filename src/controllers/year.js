import {ReturnState} from './_base.js';

const yearController = (_request) => {
  // The only way out of the year page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {yearController as default};
