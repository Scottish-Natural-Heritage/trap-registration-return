import {ReturnState} from './_base.js';

const checkAnswersController = (_request) => {
  // The only way out of the check your answers page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {checkAnswersController as default};
