const express = require('express');

const { validation, auth, ctrlWrapper, uploadAvatar } = require('../../middlewares');
const { userJoiSchema, updateSubscription } = require('../../model/user')
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(userJoiSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(userJoiSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch('/', auth, validation(updateSubscription),
    ctrlWrapper(ctrl.updateSubscription));
router.patch('/avatars', auth, uploadAvatar.single('avatar'),
    ctrlWrapper(ctrl.addUserAvatar));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post('/verify', ctrlWrapper(ctrl.verifyRepeat));
module.exports = router;
