import {ReturnState} from './_base.js';

import config from '../config/app.js';
import axios from '../config/http-request.js';

const cleanInput = (body) => {
  return {
    postcode: body.postcode === undefined ? undefined : body.postcode.trim()
  };
};

const postcodeController = async (request) => {
  // The postcode page is where the user will enter their postcode
  const cleanForm = cleanInput(request.body);
  request.session.postcode = cleanForm.postcode;

  // Clear error state
  request.session.postcodeError = false;

  // Input validation of postcode ensures between 5 and 7 characters
  if (
    request.session.postcode === undefined ||
    request.session.postcode.trim() === '' ||
    request.session.postcode.trim().length < 5
  ) {
    request.session.postcodeError = true;
  }

  // Set error state
  if (request.session.postcodeError) {
    return ReturnState.Error;
  }

  // We wrap the http request in a try/catch block so that we don't crash the
  // client-response if something goes wrong. They should always just get the OK
  // page anyway. We'll log the error for review later.
  try {
    await axios.get(`${config.apiEndpoint}/registrations/${request.session.registrationNumber}/login`, {
      params: {
        postcode: request.session.postcode,
        redirectBaseUrl: `${config.hostPrefix}${config.pathPrefix}/login?token=`,
      }
    });
  } catch (error) {
    console.error({error});
  }

  // The only way out of the usage page for now is onwards, so return success and continue
  // the form
  return ReturnState.Positive;
};

export {postcodeController as default};
