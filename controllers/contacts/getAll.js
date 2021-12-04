const { Contact } = require('../../model')
const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 6, favorite = null } = req.query;
    const ownerId = {owner: _id};
    if (favorite !== null) {
      ownerId.favorite = favorite;
      }
    const contacts = await Contact.paginate(ownerId, {page, limit, populate: {path:'owner', select:'_id email subscription'}});
      res.json({
        status: 'success',
        code: 200,
        data: { result: contacts.docs }
    })
    } catch (error) {
      next(error);
    }
}
  
module.exports = getAll;