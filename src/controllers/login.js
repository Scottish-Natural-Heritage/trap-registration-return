import {ReturnState} from './_base.js';

const loginController = (request) => {
  // The login page is where the user will be taken too from the magic link.
  request.session.loggedIn = true;

  // The only way out of this page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {loginController as default};
