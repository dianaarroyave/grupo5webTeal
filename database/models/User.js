module.exports = (sequelize, dataTypes) => {
    //string nombre tabla(o del archivo en plural)
    let alias = 'Users';
    let cols = {
        //objeto con detalles de la tabla (de las columnas)
        id: {//objeto con las características del campo
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
            unsigned: true,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,

        },
        fullname: {
            allowNull: false,
            type: dataTypes.STRING
        },
        documentType: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        documentNumber: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING
        },
        phoneNumber: {
            allowNull: false,
            type: dataTypes.INTEGER
        },
        dateBirth: {
            allowNull: false,
            type: dataTypes.DATE
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING
        },
        admin: {
            allowNull: false,
            type: dataTypes.STRING,
            defaultValue: 0
        }
    };
    let config = {
        //nombre tabla
        tableName: 'users',
        //si la tabla tiene create & update
        timestamps: true,
    }
    const Users = sequelize.define(alias, cols, config);

    return Users;
}
