const express = require('express');

const { validation } = require('../../middlewares');
const { contactJoiSchema, favoriteJoiSchema } = require('../../model/contact')
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(contactJoiSchema), ctrl.add);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validation(contactJoiSchema), ctrl.updateById);

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrl.updateById);
module.exports = router
