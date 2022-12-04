module.exports = (sequelize, dataTypes) => {
    //string nombre tabla(o del archivo en plural)
    let alias = 'PurchaseOrders';
    let cols = {
        //objeto con detalles de la tabla (de las columnas)
            //objeto con las características del campo     
    };
    let config = {
        //nombre tabla
        tableName: 'purchaseorders',
        //si la tabla tiene create & update
        timestamps: true - false,
    }
    const PurchaseOrders = sequelize.define(alias, cols, config);

    return PurchaseOrders;
}