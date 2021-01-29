import express from 'express';
const router = express.Router();

// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import UsageController from './controllers/usage.js';
import TrapRegistrationNumberController from './controllers/trap-registration-number.js';
import PostcodeController from './controllers/postcode.js';

import LoginController from './controllers/login.js';
import TargetSpeciesController from './controllers/target-species.js';
import DetailsListController from './controllers/details-list.js';
import DetailsController from './controllers/details.js';
import ConfirmController from './controllers/confirm.js';
// Configure all of the pages and routes.
// First half of application/
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
    negativeForward: 'no-usage',
    controller: UsageController
  })
);

router.use(
  Page({
    path: 'no-usage',
    back: 'usage'
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

// Second half of application/
router.use(
  Page({
    path: 'login',
    positiveForward: 'target-species',
    negativeForward: 'error-login',
    controller: LoginController
  })
);

router.use(
  Page({
    path: 'error-login'
  })
);

router.use(
  Page({
    path: 'target-species',
    back: 'login',
    positiveForward: 'details-list',
    negativeForward: 'no-target-species',
    controller: TargetSpeciesController
  })
);

router.use(
  Page({
    path: 'details-list',
    back: 'target-species',
    positiveForward: 'confirm',
    secondaryForward: 'details',
    controller: DetailsListController
  })
);

router.use(
  Page({
    path: 'details',
    back: 'details-list',
    positiveForward: 'details-list',
    controller: DetailsController
  })
);

router.use(
  Page({
    path: 'confirm',
    back: 'details-list',
    positiveForward: 'success',
    controller: ConfirmController
  })
);

router.use(
  Page({
    path: 'no-target-species',
    back: 'target-species'
  })
);

router.use(
  Page({
    path: 'success'
  })
);

export {router as default};
