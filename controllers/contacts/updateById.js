const { Contact } = require('../../model/index.js')

const updateById = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
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