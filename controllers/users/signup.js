const { Conflict } = require('http-errors');

const { User } = require('../../model');

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
      if (user) {
        throw new Conflict(`User with ${email} already exist`)
        }

    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
        status: 'created',
        code: 201,
        message: 'Success register',
        ResponseBody: {
            user: {
                email: newUser.email,
                subscription: newUser.subscription
            }
        }
    })
}


module.exports = signup;