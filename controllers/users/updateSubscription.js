const { NotFound } = require('http-errors');

const { User } = require('../../model/user');

const updateSubscription = async (req, res, _next) => {
    const { _id } = req.user;
    const { subscription } = req.body;
	const currentUser = await User.findByIdAndUpdate(_id, {subscription}, {new: true});

	if (!currentUser) {
		throw new NotFound('Current user is not found');
	}

    res.json({
        status: 'success',
        code: 200,
        ResponseBody: {
            user: {
                currentUser
            }
        }
    })
};

module.exports = updateSubscription;