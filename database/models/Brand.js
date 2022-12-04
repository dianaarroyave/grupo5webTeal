module.exports = (sequelize, dataTypes) => {
    //string nombre tabla(o del archivo en plural)
    let alias = 'Brands';
    let cols = {
        //objeto con detalles de la tabla (de las columnas)
            //objeto con las características del campo     
    };
    let config = {
        //nombre tabla
        tableName: 'brands',
        //si la tabla tiene create & update
        timestamps: true - false,
    }
    const Brands = sequelize.define(alias, cols, config);

    return Brands;
}