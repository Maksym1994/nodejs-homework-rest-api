const { BadRequest } = require('http-errors');

const { User } = require('../../model');
const { sendEmail } = require('../../helpers');

const verifyRepeat = async (req, res, _next) => {
	const { email } = req.body;
	if (!email) {
		throw new BadRequest('Missing required field email');
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new NotFound('User not found');
	}
	const { verificationToken } = user;
	if (!verificationToken) {
		throw new BadRequest('Verification has already been passed');
	}
	const mail = {
		to: email,
		subject: 'Email verification',
		html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтверждение регистрации на сайте</a>`,
	};
    await sendEmail(mail);

    res.json({
        message: 'Verify success'
    })
	
};

module.exports = verifyRepeat;