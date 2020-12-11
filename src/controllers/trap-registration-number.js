import {ReturnState} from './_base.js';

const trapRegistrationNumberController = (request) => {
  // The trap registration number page is where the user will enter their trap registration
  // number.
  request.session.trapRegistrationNumber = 'TR-123245';

  // The only way out of the usage page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {trapRegistrationNumberController as default};
