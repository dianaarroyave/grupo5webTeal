module.exports = (sequelize, dataTypes) => {
  //string nombre tabla(o del archivo en plural)
  let alias = 'Brands';
  let cols = {
    //objeto con detalles de la tabla (de las columnas)
    //objeto con las características del campo
    id_brands: {//objeto con las características del campo
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unsigned: true,
    },
    brandDescription: {//objeto con las características del campo
      type: dataTypes.STRING,
      defaultValue: true,
      allowNull: true,
    }
  };
  let config = {
    //nombre tabla
    tableName: 'brands',
    //si la tabla tiene create & update
    timestamps: true,
  }
  const Brands = sequelize.define(alias, cols, config);

  return Brands;
}

// Brands.associate = function (models) {
//   Brands.hasMany(models.Product, {
//     as: 'brands',
//     foreingKey: 'id_products'
//   })
// }
