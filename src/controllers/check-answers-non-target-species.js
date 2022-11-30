import axios from '../config/http-request.js';
import config from '../config/app.js';
import {ReturnState} from './_base.js';

const checkAnswersNonTargetSpeciesController = async (request) => {
  // Declare errors and set to false.
  request.session.missingConfirmValue = false;
  request.session.apiError = false;

  // Did the user click the confirm checkbox?
  request.session.confirmedDeclaration = request.body.confirm === 'confirm';

  // If the user didn't click the confirm checkbox this is an error.
  request.session.missingConfirmValue = !request.session.confirmedDeclaration;

  // If we have an error return the error state to let the user know immediately.
  if (request.session.missingConfirmValue) {
    return ReturnState.Error;
  }

  // If we made it here the user has confirmed their return so get the data ready to send.
  const newReturn = {
    noMeatBaitsUsed: !request.session.meatBaitsUsed,
    year: request.session.year,
    numberLarsenMate: request.session.numberLarsenMateCaught,
    numberLarsenPod: request.session.numberLarsenPodCaught,
    // Disabled as targetSpecies could be undefined and we want a value.
    // eslint-disable-next-line no-unneeded-ternary
    nonTargetSpeciesToReport: request.session.targetSpecies ? true : false,
    nonTargetSpeciesCaught: request.session.detailsList ? request.session.detailsList : []
  };

  // And send the return data to the API.
  try {
    // Allocate a new return.
    const newReturnResponse = await axios.post(
      config.apiEndpoint + '/registrations/' + request.session.loggedInRegNo + '/return'
    );

    // Determine where the back-end saved it.
    const newReturnUrl = newReturnResponse.headers.location;

    // Post the return's data to the API.
    await axios.put(newReturnUrl, newReturn);
    // Clear all data in session now it's been saved to the database.
  } catch (error) {
    console.log('Error creating new return:' + error);
    request.session.apiError = true;
    return ReturnState.Error;
  }

  // Clear all data in session now it's been saved to the database.
  request.session.year = false;
  request.session.meatBaitsUsed = undefined;
  request.session.numberLarsenMateCaught = false;
  request.session.numberLarsenPodCaught = false;
  request.session.targetSpecies = undefined;

  // All went well so proceed to success page.
  return ReturnState.Positive;
};

export {checkAnswersNonTargetSpeciesController as default};