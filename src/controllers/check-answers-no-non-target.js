import {ReturnState} from './_base.js';

const checkAnswersNoNonTargetController = (_request) => {
  // The only way out of the check-answers-no-non-target page is onwards, so return Positive.
  return ReturnState.Positive;
};

export {checkAnswersNoNonTargetController as default};
