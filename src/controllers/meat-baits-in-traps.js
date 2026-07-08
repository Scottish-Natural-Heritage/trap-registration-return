import {randomUUID} from 'node:crypto';
import {ReturnState} from './_base.js';

const meatBaitInTrapsController = (request) => {
  // To mitigate the risk of replay attack we generate a UUID and save to session.
  request.session.uuid = randomUUID();

  // Did the user tell us they have used meat baits.
  if (request.body.meatBaitsUsed === 'yes') {
    // Then we don't have any errors. This clears any previous errors.
    request.session.meatBaitsError = false;
    // Save the decision.
    request.session.meatBaitsUsed = true;
    // Follow the 'happy path'.
    return ReturnState.Positive;
  }

  // Did the user tell us they have not used meat baits.
  if (request.body.meatBaitsUsed === 'no') {
    // Then we don't have any errors. This clears any previous errors.
    request.session.meatBaitsError = false;
    // Save the decision.
    request.session.meatBaitsUsed = false;
    // Follow the 'easy-out path'.
    return ReturnState.Negative;
  }

  // The user submitted the form without selecting an option, this is an error.
  request.session.meatBaitsError = true;
  // Unset any saved value.
  request.session.meatBaitsUsed = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {meatBaitInTrapsController as default};
