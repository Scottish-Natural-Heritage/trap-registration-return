import axios from 'axios';
import config from '../config.js';
import {ReturnState} from './_base.js';

const targetSpeciesController = async (request) => {
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
    try {
      // Allocate a new return.
      const newReturnResponse = await axios.post(config.apiEndpoint + '/return');
      // Determine where the back-end's saved it.
      const newReturnUrl = newReturnResponse.headers.location;
      const newReturn = {
        trapRegistrationNumber: request.session.trapRegistrationNumber,
        nonTargetSpeciesToReport: request.session.targetSpecies
      };
      // Send the back-end our Return.
      await axios.put(newReturnUrl, newReturn);
      // Go down the 'STOP' path.
      return ReturnState.Negative;
    } catch (error) {
      // TODO: Do something useful with this error.
      console.log(error);
      // Let the user know it went wrong, and to 'probably' try again?
      return ReturnState.Error;
    }
  }

  // The user submitted the form without selecting an option, this is an error!
  request.session.targetSpeciesError = true;
  // Unset any saved value.
  request.session.targetSpecies = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {targetSpeciesController as default};
