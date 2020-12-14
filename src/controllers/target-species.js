import {ReturnState} from './_base.js';

const targetSpeciesController = (request) => {
  // The target species page is where the user will state whether or not they have caught
  // any non target species in their traps.
  request.session.targetSpecies = true;
  // The only way out of the target species page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {targetSpeciesController as default};
