const User = require('../../models/User.js');

const userCreate = async (req, res) => {
    await User.create({
        image,
        fullname,
        DocumentType,
        documentNumber,
        email,
        phoneNumber,
        dateBirth,
        password,
        admin
    })
}

module.exports = userCreate;