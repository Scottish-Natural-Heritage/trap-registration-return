import {ReturnState} from './_base.js';

//Cleans input checking if its undefined and trimming white space from the text
const cleanInput = (body) => {
  return {
    registrationNumber: body.registrationNumber === undefined ? undefined : body.registrationNumber.trim()
  }
}
const trapRegistrationNumberController = (request) => {
  // The trap registration number page is where the user will enter their trap registration
  // number.
  const cleanForm = cleanInput(request.body);
  request.session.registrationNumber = cleanForm.registrationNumber;

  //Clear error state
  request.session.registrationNumberError = false;
  //Check if registration number is valid and isn't empty
  if (
    request.session.registrationNumber === undefined ||
    request.session.registrationNumber.trim() === '' ||
    ! new RegExp('^[0-9]{1,5}$').test(request.session.registrationNumber)
  ) {
    request.session.registrationNumberError = true;
  }

  //Set error state
  if (request.session.registrationNumberError) {
    return ReturnState.Error;
  }
  //Return positive state for progression
  return ReturnState.Positive;
};

export {trapRegistrationNumberController as default};
