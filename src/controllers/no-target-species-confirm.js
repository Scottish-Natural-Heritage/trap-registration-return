import axios from 'axios';
import config from '../config/app.js';
import {ReturnState} from './_base.js';

const noTargetSpeciesConfirmController = async (request) => {
  try {
    // Allocate a new return.
    const newReturnResponse = await axios.post(
      config.apiEndpoint + '/registrations/' + request.session.loggedInRegNo + '/return'
    );
    // Determine where the back-end's saved it.
    const newReturnUrl = newReturnResponse.headers.location;
    const newReturn = {
      nonTargetSpeciesToReport: request.session.targetSpecies,
      nonTargetSpeciesCaught: []
    };
    // Send the back-end our Return.
    await axios.put(newReturnUrl, newReturn);
    // Go down the 'STOP' path.
    return ReturnState.Positive;
  } catch (error) {
    // TODO: Do something useful with this error.
    console.log(error);
    // Let the user know it went wrong, and to 'probably' try again?
    return ReturnState.Error;
  }
};

export {noTargetSpeciesConfirmController as default};
