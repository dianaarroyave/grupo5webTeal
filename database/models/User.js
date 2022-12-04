module.exports = (sequelize, dataTypes) => {
    //string nombre tabla(o del archivo en plural)
    let alias = 'Users';
    let cols = {
        //objeto con detalles de la tabla (de las columnas)
        id: {//objeto con las características del campo
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        image: {
            allowNull: false,
        },
        fullname: {
            allowNull: false,
            type: dataTypes.STRING
        },
        documentType: {
            allowNull: false,
        },
        documentNumber: {
            allowNull: false,
        },
        email: {
            allowNull: false,
        },
        phoneNumber: {
            allowNull: false,
        },
        dateBirth: {
            allowNull: false,
        },
        password: {
            allowNull: false,
        },
        admin: {
            allowNull: false,
        },
    };
    let config = {
        //nombre tabla
        tableName: 'users',
        //si la tabla tiene create & update
        timestamps: true - false,
    }
    const Users = sequelize.define(alias, cols, config);

    return Users;
}