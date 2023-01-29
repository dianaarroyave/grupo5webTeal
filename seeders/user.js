const bcrypt = require('bcrypt');
const users = [
    {
        userImage: '',
        fullName: 'William Serna',
        documentType: 'CC',
        documentNumber: '1234567',
        email: 'william@gmail.com',
        phoneNumber: '3116978993',
        password: bcrypt.hashSync('123456789', 10),
    }
];

module.exports = users;

