import {ReturnState} from './_base.js';

const checkAnswersNonTargetSpeciesController = (_request) => {
  // The only way out of the check-answers-non-target-species page is onwards, so return Positive.
  return ReturnState.Positive;
};

export {checkAnswersNonTargetSpeciesController as default};
