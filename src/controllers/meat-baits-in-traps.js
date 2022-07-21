import {ReturnState} from './_base.js';

const meatBaitInTrapsController = (request) => {
  // The meat bait in traps page is where our cookie banner is placed, so by progressing past
  // this page, we know the user's seen the banner, so we don't need to show it
  // again.
  request.session.seenCookie = true;

  // The only way out of the meat bait in traps page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {meatBaitInTrapsController as default};
