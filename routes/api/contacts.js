const express = require('express');

const { validation } = require('../../middlewares');
const { contactSchema } = require('../../schemas')
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactSchema);

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validateMiddleware, ctrl.add);

router.delete('/:contactId', ctrl.removeById);

router.put('/:contactId', validateMiddleware, ctrl.updateById);

module.exports = router
