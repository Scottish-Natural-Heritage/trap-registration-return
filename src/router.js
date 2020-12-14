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
import DetailsAddController from './controllers/details-add.js';
import DetailsEditController from './controllers/details-edit.js';
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
    // TODO: Add no usage path as negative here.
    controller: UsageController
  })
);

// TODO: Add no usage path.

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
    negativeForward: 'error',
    controller: LoginController
  })
);

router.use(
  Page({
    path: 'target-species',
    back: 'login',
    positiveForward: 'details-list',
    // TODO: Add negative path here.
    controller: TargetSpeciesController
  })
);

// TODO: Add no target-species path.

router.use(
  Page({
    path: 'details-list',
    back: 'target-species',
    positiveForward: 'confirm',
    secondaryForward: 'details-add',
    tertiaryForward: 'details-edit',
    controller: DetailsListController
  })
);

router.use(
  Page({
    path: 'details-add',
    back: 'details-list',
    positiveForward: 'details-list',
    controller: DetailsAddController
  })
);

router.use(
  Page({
    path: 'details-edit',
    back: 'details-list',
    positiveForward: 'details-list',
    controller: DetailsEditController
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
    path: 'success'
  })
);

export {router as default};
