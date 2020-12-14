import {ReturnState} from './_base.js';

const targetSpeciesController = (request) => {
  // Did the user tell us they have caught some non target species.
  if (request.body.targetSpecies === 'yes') {
    // Then we don't have any errors. This clears any previous errors.
    request.session.targetSpeciesError = false;
    // Save the decision.
    request.session.targetSpecies = true;
    // Follow the 'happy path'.
    return ReturnState.Positive;
    }
  // Did the user tell us they have not caught any non target species.
  if (request.body.targetSpecies === 'no') {
    //  It's a silly answer, but not an error. This clears any previous errors.
    request.session.targetSpeciesError = false;
    // Save the decision.
    request.session.targetSpecies = false;
    // Go down the 'STOP' path.
    return ReturnState.Negative;
  }

  // The user submitted the form without selecting an option, this is an error!
  request.session.targetSpeciesError = true;
  // Unset any saved value.
  request.session.targetSpecies = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {targetSpeciesController as default};
