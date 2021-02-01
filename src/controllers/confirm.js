import axios from 'axios';
import config from '../config/app.js';
import {ReturnState} from './_base.js';

const confirmController = async (request) => {
  try {
    // Allocate a new return.
    const newReturnResponse = await axios.post(
      config.apiEndpoint + '/registrations' + request.session.loggedInRegNo + '/return'
    );

    // Determine where the back-end's saved it.
    const newReturnUrl = newReturnResponse.headers.location;

    // Get our return object ready for submission.
    const newReturn = {
      nonTargetSpeciesToReport: request.session.targetSpecies,
      nonTargetSpeciesCaught: request.session.detailsList
    };

    // Send the back-end our Return.
    await axios.put(newReturnUrl, newReturn);
    // Let them know it all went well.
    return ReturnState.Positive;
  } catch (error) {
    // TODO: Do something useful with this error.
    console.log(error);

    // Let the user know it went wrong, and to 'probably' try again?
    return ReturnState.Error;
  }
};

export {confirmController as default};
