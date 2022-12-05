module.exports = (sequelize, dataTypes) => {
  //string nombre tabla(o del archivo en plural)
  let alias = 'Products';
  let cols = {
    //objeto con detalles de la tabla (de las columnas)
    //objeto con las características del campo
    id: {//objeto con las características del campo
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
      unsigned: true,
      allowNull: false
    },
    name: {//objeto con las características del campo
      type: dataTypes.STRING,
      allowNull: false
    },
    price: {//objeto con las características del campo
      type: dataTypes.INTEGER,
      allowNull: false
    },
    productDescription: {//objeto con las características del campo
      type: dataTypes.STRING,
      allowNull: true,
      defaultValue:true
    },
    collectionDescription: {//objeto con las características del campo
      type: dataTypes.STRING,
      allowNull: true,
      defaultValue:true
    },
    collection: {//objeto con las características del campo
      type: dataTypes.STRING,
      allowNull: true,
      defaultValue:true
    },
    id_brands: {//objeto con las características del campo
      type: dataTypes.INTEGER,
    //preguntar al profe la clave foranea
      allowNull: true,
      defaultValue:true
    }
  };
  let config = {
    //nombre tabla
    tableName: 'products',
    //si la tabla tiene create & update
    timestamps: true,
  }
  const Products = sequelize.define(alias, cols, config);

  return Products;
}
