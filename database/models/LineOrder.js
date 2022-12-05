module.exports = (sequelize, dataTypes) => {
  //string nombre tabla(o del archivo en plural)
  let alias = 'LineOrders';
  let cols = {
    //objeto con detalles de la tabla (de las columnas)
    //objeto con las características del campo
    id_lineOrder: {//objeto con las características del campo
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,

    },
    id_user: {//objeto con las características del campo
      type: dataTypes.INTEGER,
      allowNull: false,
      unsigned: true,

    },
    id_purchaseOrders: {//objeto con las características del campo
      type: dataTypes.INTEGER,
      allowNull: false,
      unsigned: true,
    }
  };
  let config = {
    //nombre tabla
    tableName: 'lineorder',
    //si la tabla tiene create & update
    timestamps: true,
  }
  const LineOrders = sequelize.define(alias, cols, config);

  return LineOrders;
}
