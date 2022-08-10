import {ReturnState} from './_base.js';

const checkAnswersNoMeatBaitsController = (_request) => {
  // The only way out of the check-answers-no-meat-baits page is onwards, so return Positive.
  return ReturnState.Positive;
};

export {checkAnswersNoMeatBaitsController as default};
