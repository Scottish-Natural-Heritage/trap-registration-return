import {ReturnState} from './_base.js';

const confirmController = (request) => {
  // The confirm page is where the user will confirm the details of their return.
  request.session.confirm = true;

  // The only way out of this page for now is onwards, so return success and continue
  // the form.
  return ReturnState.Positive;
};

export {confirmController as default};
