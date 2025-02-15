const { NotFound } = require('http-errors');
const { Contact } = require('../../model/index.js');

const removeById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await Contact.findByIdAndRemove(contactId);
      if (!contact) {
        throw new NotFound(`Product with id=${contactId} not found`)
      }
      res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: {
          result: contact
        }
       })
    } catch (error) {
      next(error);
    }
}
  
module.exports = removeById;