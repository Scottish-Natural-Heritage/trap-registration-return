import express from 'express';
// Import all the controllers.
import {Page} from './controllers/_base.js';
import StartController from './controllers/start.js';
import TrapRegistrationNumberController from './controllers/trap-registration-number.js';
import PostcodeController from './controllers/postcode.js';
import LoginController from './controllers/login.js';
import YearController from './controllers/year.js';
import MeatBaitsInTrapsController from './controllers/meat-baits-in-traps.js';
import HowManyTrapsUsedController from './controllers/how-many-traps-used.js';
import TargetSpeciesController from './controllers/target-species.js';
import DetailsListController from './controllers/details-list.js';
import DetailsController from './controllers/details.js';
import CheckAnswersController from './controllers/check-answers.js';

const router = express.Router();

// Configure all of the pages and routes.
// First half of application/
router.use(
  Page({
    path: 'start',
    positiveForward: 'trap-registration-number',
    controller: StartController
  })
);

router.use(
  Page({
    path: 'trap-registration-number',
    back: 'start',
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
    positiveForward: 'year',
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
    path: 'year',
    back: 'login',
    positiveForward: 'meat-baits-in-traps',
    controller: YearController
  })
);

router.use(
  Page({
    path: 'meat-baits-in-traps',
    back: 'year',
    positiveForward: 'how-many-traps-used',
    controller: MeatBaitsInTrapsController
  })
);

router.use(
  Page({
    path: 'how-many-traps-used',
    back: 'meat-baits-in-traps',
    positiveForward: 'target-species',
    controller: HowManyTrapsUsedController
  })
);

router.use(
  Page({
    path: 'target-species',
    back: 'how-many-traps-used',
    positiveForward: 'details',
    negativeForward: 'check-answers',
    controller: TargetSpeciesController
  })
);

router.use(
  Page({
    path: 'check-answers',
    back: 'target-species',
    positiveForward: 'submitted-return-success',
    controller: CheckAnswersController
  })
);

router.use(
  Page({
    path: 'submitted-return-success'
  })
);

router.use(
  Page({
    path: 'details-list',
    back: 'details',
    positiveForward: 'check-answers',
    secondaryForward: 'details',
    controller: DetailsListController
  })
);

router.use(
  Page({
    path: 'details',
    back: 'target-species',
    positiveForward: 'details-list',
    controller: DetailsController
  })
);

router.use(
  Page({
    path: 'check-answers',
    back: 'details-list',
    positiveForward: 'submitted-return-success',
    controller: CheckAnswersController
  })
);

router.use(
  Page({
    path: 'submitted-return-success'
  })
);

export {router as default};
