const bcrypt = require('bcrypt');
const users = [
    {
        userImage: '',
        fullName: 'William Serna',
        documentType: 'CC',
        documentNumber: '1234567',
        email: 'william@gmail.com',
        phoneNumber: '3116978993',
        dateBirth: '06/05/1800',
        password: bcrypt.hashSync('1234567', 10),
    }
];

module.exports = users;
