module.exports = (sequelize, dataTypes) => {
  //string nombre tabla(o del archivo en plural)
  let alias = 'PurchaseOrders';
  let cols = {
    //objeto con detalles de la tabla (de las columnas)
    //objeto con las características del campo
    id_purchaseOrders: {//objeto con las características del campo
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,

    },
    id_products: {//objeto con las características del campo
      type: dataTypes.INTEGER,
      allowNull: false,
      unsigned: true,

    },
    quantity: {//objeto con las características del campo
      type: dataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
    }
  };
  let config = {
    //nombre tabla
    tableName: 'purchaseorders',
    //si la tabla tiene create & update
    timestamps: true,
  }
  const PurchaseOrders = sequelize.define(alias, cols, config);

  return PurchaseOrders;
}

// PurchaseOrders.associate = function (models) {
//   PurchaseOrders.belongsTo(models.Product, {
//     as: 'purchaseOrders',
//     foreingKey: 'id_products'
//   })
// }
