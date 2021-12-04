const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { contactJoiSchema, favoriteJoiSchema } = require('../../model/contact')
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(contactJoiSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeById));

router.put('/:contactId', auth, validation(contactJoiSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', auth, validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateById));
module.exports = router
