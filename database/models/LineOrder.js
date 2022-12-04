module.exports = (sequelize, dataTypes) => {
    //string nombre tabla(o del archivo en plural)
    let alias = 'LineOrders';
    let cols = {
        //objeto con detalles de la tabla (de las columnas)
            //objeto con las características del campo     
    };
    let config = {
        //nombre tabla
        tableName: 'lineorder',
        //si la tabla tiene create & update
        timestamps: true - false,
    }
    const LineOrders = sequelize.define(alias, cols, config);

    return LineOrders;
}