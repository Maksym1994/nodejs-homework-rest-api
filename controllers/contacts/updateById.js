const { updateContact } = require('../../model/index.js')

const updateById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await updateContact(contactId, req.body);
      res.json({
        status: 'success',
        code: 200,
        message: 'missing fields',
        data: {
          result: contact
        }
      })
    } catch (error) {
      next(error);
    }
}
  
module.exports = updateById; 