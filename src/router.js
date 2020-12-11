import express from 'express';
const router = express.Router();

// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import UsageController from './controllers/usage.js';
import TrapRegistrationNumberController from './controllers/trap-registration-number.js';
import PostcodeController from './controllers/postcode.js';

// Configure all of the pages and routes.

router.use(
  Page({
    path: 'start',
    positiveForward: 'usage',
    controller: StartController
  })
);

router.use(
  Page({
    path: 'usage',
    back: 'start',
    positiveForward: 'trap-registration-number',
    controller: UsageController
  })
);

router.use(
  Page({
    path: 'trap-registration-number',
    back: 'usage',
    positiveForward: 'postcode',
    controller: TrapRegistrationNumberController
  })
);

router.use(
  Page({
    path: 'postcode',
    back: 'trap-registration-number',
    positiveForward: 'verification-success',
    controller: PostcodeController
  })
);

router.use(
  Page({
    path: 'verification-success'
  })
);

export {router as default};
