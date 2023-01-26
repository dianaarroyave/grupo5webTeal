const products = [
  {
    productImage: "1.png",
    name: "Camiseta Thermal",
    price: "80000",
    productDescription: "Camiseta Thermal Teal Original",
    collection:"Thermal",
    collectionDescription:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '1',
    brand_id: 2,
  },

  {
    productImage: "2.png",
    name: "Sudadera Thermal",
    price: "115000",
    productDescription: "Sudadera Thermal Teal Basics",
    collection: "Thermal",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '1',
    brand_id: 2,
  },

  {
    productImage: "3.png",
    name: "Hoddie Thermal",
    price: "100000",
    productDescription: "Hoodie Thermal Teal Original",
    collection: "Thermal",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '1',
    brand_id: 2,
  },

  {
    productImage: "4.png",
    name: "Crewneck Thermal",
    price: "100000",
    productDescription: "Crewneck Thermal Teal Original",
    collection: "Thermal",
    collectionDescription:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 2,
  },

  {
    productImage: "5.png",
    name: "Pañoleta Thermal",
    price: "45000",
    productDescription: "Pañoleta Thermal Teal Original",
    collection: "Thermal",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 2,
  },

  {
    productImage: "6.png",
    name: "Crewneck Ethereal",
    price: "135000",
    productDescription: "Crewneck Ethereal Teal Original",
    collection: "Ethereal",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 2,
  },

  {
    productImage: "7.png",
    name: "Hoddie Ethereal",
    price: "145000",
    productDescription: "Hoddie Ethereal Teal Original",
    collection: "Ethereal",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 2,
  },

  {
    productImage: "8.png",
    name: "Camiseta Ethereal",
    price: "80000",
    productDescription: "Camiseta Ethereal Teal Original",
    collection: "Ethereal",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 2,
  },

  {
    productImage: "9.png",
    name: "Camiseta Oversize",
    price: "60000",
    productDescription: "Camiseta Oversize Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 1,
  },

  {
    productImage: "9.1.png",
    name: "Camiseta Oversize",
    price: "60000",
    productDescription: "Camiseta Oversize Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Blanco',
    quantity: '2',
    featured: '0',
    brand_id: 1,
  },

  {
    productImage: "10.png",
    name: "Camibuso básico",
    price: "75000",
    productDescription: "Camibuso básico Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '1',
    brand_id: 1,
  },

  {
    productImage: "10.1.png",
    name: "Camibuso básico",
    price: "75000",
    productDescription: "Camibuso básico Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Blanco',
    quantity: '2',
    featured: '1',
    brand_id: 1,
  },

  {
    productImage: "11.png",
    name: "Short básico",
    price: "65000",
    productDescription: "Short básico Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Hombre",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 1,
  },

  {
    productImage: "12.png",
    name: "Hoddie básico",
    price: "105000",
    productDescription: "Hoddie básico Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Blanco',
    quantity: '2',
    featured: '0',
    brand_id: 1,
  },

  {
    productImage: "15.png",
    name: "Hoddie básico",
    price: "105000",
    productDescription: "Hoddie básico Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 1,
  },

  {
    productImage: "13.png",
    name: "Sudadera básica",
    price: "110000",
    productDescription: "Sudadera básica Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Unisex",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: '0',
    brand_id: 1,
  },

  {
    productImage: "14.png",
    name: "Crop top básico",
    price: "55000",
    productDescription:"Crop top básico Teal Basics",
    collection: "Basics",
    collectionDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    categories: "Mujer",
    size: 'S',
    color: 'Negro',
    quantity: '2',
    featured: 1,
    brand_id: 1,
  }
]

module.exports = products;
