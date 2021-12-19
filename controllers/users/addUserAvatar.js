const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { User } = require('../../model');

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const addUserAvatar = async(req, res) => {
    const { path: tempUploadAvatar, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    try {
        const img = await Jimp.read(tempUploadAvatar);
        img.resize(250, 250)
            .write(tempUploadAvatar);
        const resultUpload = path.join(avatarDir, imageName);
        await fs.rename(tempUploadAvatar, resultUpload);
        const avatarURL = path.join("public", "avatars", imageName);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL });
    } catch (error) {
        await fs.unlink(tempUploadAvatar);
        throw error
    }
}

module.exports = addUserAvatar;