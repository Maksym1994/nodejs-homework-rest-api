const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../../helpers');

const { User } = require('../../model');

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
      if (user) {
        throw new Conflict(`User with ${email} already exist`)
        }
    
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();
    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();
    const mail = {
        to: email,
		subject: 'Email verification',
		html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}>Подтверждение регистрации на сайте</a>`,
    }
    await sendEmail(mail);
    
    res.status(201).json({
        status: 'created',
        code: 201,
        message: 'Success register',
        ResponseBody: {
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
                verifyToken: newUser.verifyToken,
			    verify: newUser.verify,
            }
        }
    })
}


module.exports = signup;